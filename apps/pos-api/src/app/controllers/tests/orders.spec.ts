// Testy jednostkowe dla OrderController.
// Komentarze w języku polskim wyjaśniają poszczególne przypadki testowych,
// aby nowa osoba w zespole łatwiej zrozumiała, co jest testowane.

import { OrderController } from '../orders';

describe('OrderController', () => {
  // Mock serwisu, aby kontroler był testowany izolowane od zależności (unit test)
  const mockOrderService: any = {
    syncOrders: jest.fn(),
    getOrders: jest.fn(),
  };

  let controller: OrderController;

  beforeEach(() => {
    // Tworzymy instancję kontrolera z podmienionym serwisem
    controller = new OrderController(mockOrderService);
    jest.clearAllMocks();
  });

  it('powinien wywołać orderService.syncOrders i zwrócić jego wynik (POST /orders/sync)', async () => {
    // Przygotowanie: zamockowany wynik serwisu
    mockOrderService.syncOrders.mockResolvedValueOnce(['synced1', 'synced2']);

    // Akcja: wywołanie kontrolera
    const result = await controller.syncOrders();

    // Oczekiwania: serwis został wywołany i wynik przekazany dalej
    expect(mockOrderService.syncOrders).toHaveBeenCalledTimes(1);
    expect(result).toEqual(['synced1', 'synced2']);
  });

  it('powinien pobrać zamówienia i skonwertować pola cashAmount/cardAmount na number (GET /orders)', async () => {
    // Przygotowanie: serwis zwraca obiekty z metodą toNumber (tak jak Prisma.Decimal)
    const mockedOrders = [
      {
        id: '1',
        cashAmount: { toNumber: () => 100 },
        cardAmount: { toNumber: () => 200 },
        products: [],
      },
    ];

    mockOrderService.getOrders.mockResolvedValueOnce(mockedOrders);

    // Wywołujemy kontroler - argumenty odpowiadają dekoratorom @Query i @Body
    const result = await controller.getOrders(undefined, undefined, undefined, { category: '', product: '' });

    // Oczekiwania: wartości zostały skonwertowane przez kontroler
    expect(mockOrderService.getOrders).toHaveBeenCalledTimes(1);
    expect(result).toEqual([
      {
        id: '1',
        cashAmount: 100,
        cardAmount: 200,
        products: [],
      },
    ]);
  });
});
