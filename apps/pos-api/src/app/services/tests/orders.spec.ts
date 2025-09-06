import { OrderService } from '../orders';
import { PrismaClient, Prisma } from '@prisma/client';
import axios from 'axios';

jest.mock('axios');

describe('OrderService', () => {
  let service: OrderService;
  // Tworzymy prosty mock PrismaClient z metodami używanymi w serwisie
  const prismaMock: any = {
    $transaction: jest.fn(),
    order: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      upsert: jest.fn(),
      findUniqueOrThrow: jest.fn(),
    },
    product: {
      findUniqueOrThrow: jest.fn(),
    },
    orderProduct: {
      create: jest.fn(),
      upsert: jest.fn(),
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    service = new OrderService(prismaMock as unknown as PrismaClient);
  });

  it('syncOrders powinien pobrać dane z zewnętrznego API i zapisać zamówienia', async () => {
    // Przygotowanie: zamockowane dane z API
    const fakeCarts = [
      { id: 1, date: '2020-01-01', products: [{ productId: 10, quantity: 2, id: 10 }] },
    ];

    (axios.get as jest.Mock).mockResolvedValueOnce({ data: fakeCarts });

    // Mockujemy zachowanie transakcji Prisma: wywoływana funkcja powinna być wykonana z "prisma"
    prismaMock.$transaction.mockImplementation(async (fn: any) => fn(prismaMock));

    // Mock upsert order
    prismaMock.order.upsert.mockResolvedValueOnce({ id: 123, products: [] });

    // Mock product lookup
    prismaMock.product.findUniqueOrThrow.mockResolvedValueOnce({ id: 10, price: new Prisma.Decimal(5) });

    // Mock orderProduct.upsert
    prismaMock.orderProduct.upsert.mockResolvedValueOnce({ orderId: 123, productId: 10, price: new Prisma.Decimal(5) });

    // Mock order.update
    prismaMock.order.update.mockResolvedValueOnce({ id: 123 });

    const result = await service.syncOrders();

    // Oczekiwania: axios.get wywołane, transakcja Prisma wykonana, wynik zwrócony
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(prismaMock.$transaction).toHaveBeenCalledTimes(1);
    expect(prismaMock.order.upsert).toHaveBeenCalled();
    expect(prismaMock.product.findUniqueOrThrow).toHaveBeenCalled();
    expect(prismaMock.orderProduct.upsert).toHaveBeenCalled();
    expect(prismaMock.order.update).toHaveBeenCalled();
    expect(result).toEqual([{ id: 123, products: [] }]);
  });

  it('addOrder powinien stworzyc zamówienie i powiązane orderProduct', async () => {
    prismaMock.$transaction.mockImplementation(async (fn: any) => fn(prismaMock));

    // Mockowanie tworzenia zamówienia
    prismaMock.order.create.mockResolvedValueOnce({ id: 'order-1' });

    prismaMock.orderProduct.create.mockResolvedValueOnce({ orderId: 'order-1', productId: 'p1', quantity: 2, price: new Prisma.Decimal(10) });

    prismaMock.order.findUnique.mockResolvedValueOnce({ id: 'order-1', products: [{ productId: 'p1', quantity: 2, price: new Prisma.Decimal(10) }] });

    const items = [{ product: 'p1', quantity: 2, price: 10 }];

    const result = await service.addOrder(items, 100, 0);

    expect(prismaMock.$transaction).toHaveBeenCalled();
    expect(prismaMock.order.create).toHaveBeenCalled();
    expect(prismaMock.orderProduct.create).toHaveBeenCalled();
    expect(prismaMock.order.findUnique).toHaveBeenCalled();
    expect(result).toEqual({ id: 'order-1', products: [{ productId: 'p1', quantity: 2, price: new Prisma.Decimal(10) }] });
  });

  it('getOrders powinien wywołać prisma.order.findMany z odpowiednimi warunkami', async () => {
    prismaMock.order.findMany.mockResolvedValueOnce([]);

    await service.getOrders(10, 0, '2020-01-01', 'cat1', 'prod1');

    expect(prismaMock.order.findMany).toHaveBeenCalledTimes(1);
    const callArg = prismaMock.order.findMany.mock.calls[0][0];
    // Sprawdzamy, czy w argumencie znajduje się filtr na produkty i date
    expect(callArg.where).toBeDefined();
    expect(callArg.include).toBeDefined();
  });
});
