// Plik testowy: services/reports.service.spec.ts
// Testy jednostkowe dla ReportService z komentarzami po polsku.

import { ReportService } from '../reports';
import { PrismaClient } from '@prisma/client';

describe('ReportService', () => {
  let service: ReportService;
  const prismaMock: any = {
    $transaction: jest.fn(),
    order: {
      aggregate: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
    orderProduct: {
      aggregate: jest.fn(),
      groupBy: jest.fn(),
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    service = new ReportService(prismaMock as unknown as PrismaClient);
  });

  it('getReports powinien zwrócić statystyki i przetworzone zamówienia', async () => {
    // Przygotowanie: mock agregacji i listy zamówień
    prismaMock.order.aggregate.mockResolvedValueOnce({ _count: 1, _sum: { cashAmount: 100, cardAmount: 50 } });
    prismaMock.order.findMany.mockResolvedValueOnce([
      { id: 'o1', date: new Date('2020-01-01'), cashAmount: 100, cardAmount: 50 },
    ]);
    prismaMock.orderProduct.aggregate.mockResolvedValueOnce({ _count: 3 });

    // Mock implementacja transakcji: uruchamiamy przekazaną funkcję z naszym mockiem
    prismaMock.$transaction.mockImplementation(async (fn: any) => fn(prismaMock));

    const result = await service.getReports('2020-01-01', '2020-01-02');

    expect(prismaMock.$transaction).toHaveBeenCalled();
    expect(prismaMock.order.aggregate).toHaveBeenCalled();
    expect(prismaMock.order.findMany).toHaveBeenCalled();
    expect(prismaMock.orderProduct.aggregate).toHaveBeenCalled();

    expect(result).toEqual({
      stats: { _count: 1, _sum: { cashAmount: 100, cardAmount: 50 } },
      orders: [
        { id: 'o1', date: new Date('2020-01-01'), cashAmount: 100, cardAmount: 50, sold: 3 },
      ],
    });
  });

  it('getFullReport powinien zwrócić przychody, podsumowanie produktów i listę zamówień', async () => {
    prismaMock.order.aggregate.mockResolvedValueOnce({ _sum: { cashAmount: 200, cardAmount: 100 } });
    prismaMock.order.findMany.mockResolvedValueOnce([{ id: 'o1' }]);
    prismaMock.orderProduct.groupBy.mockResolvedValueOnce([{ productId: 'p1', _sum: { quantity: 5, price: 500 }, _count: { _all: 2 } }]);

    prismaMock.order.findMany.mockResolvedValueOnce([{ id: 'o1', date: new Date('2020-01-01'), products: [] }]);

    const result = await service.getFullReport('2020-01-01');

    expect(prismaMock.order.aggregate).toHaveBeenCalled();
    expect(prismaMock.order.findMany).toHaveBeenCalled();
    expect(prismaMock.orderProduct.groupBy).toHaveBeenCalled();

    expect(result).toEqual({
      revenue: { cashAmount: 200, cardAmount: 100 },
      productSummary: [{ productId: 'p1', _sum: { quantity: 5, price: 500 }, _count: { _all: 2 } }],
      orders: [{ id: 'o1' }],
    });
  });
});
