import { ProductsController } from './products'

// PL: Testy jednostkowe kontrolera ProductsController
// PL: Metody kontrolera delegują logikę do ProductsService — tutaj używamy atrap (mock) dla serwisu

describe('ProductsController', () => {
  let controller: ProductsController
  let mockService: any

  beforeEach(() => {
    // PL: Atrapujemy metody serwisu, których oczekuje kontroler
    mockService = {
      syncProducts: jest.fn(),
      addProduct: jest.fn(),
      getProducts: jest.fn(),
      deleteProduct: jest.fn(),
      changeProduct: jest.fn(),
    }
    controller = new ProductsController(mockService)
    jest.clearAllMocks()
  })

  it('sync - wywołuje synchronizację i zwraca wynik serwisu', async () => {
    // PL: Przygotowujemy atrapę odpowiedzi serwisu
    ;(mockService.syncProducts as jest.Mock).mockResolvedValue({ message: 'ok' })

    const res = await controller.sync()

    expect(mockService.syncProducts).toHaveBeenCalled()
    expect(res).toEqual({ message: 'ok' })
  })

  it('addProduct - przekazuje dane do serwisu i konwertuje price na liczbę', async () => {
    const body = { name: 'P', imageUrl: 'url', price: 5, quantity: 1, category: { new: true, descriptor: 'C' } }
    // PL: Serwis zwraca obiekt z polem price jako obiekt z metodą toNumber (tak jak Prisma.Decimal)
    const product = { id: 'p1', price: { toNumber: () => 5 } }
    ;(mockService.addProduct as jest.Mock).mockResolvedValue(product)

    const res = await controller.addProduct(body)

    expect(mockService.addProduct).toHaveBeenCalledWith('P', 'url', 5, 1, { new: true, descriptor: 'C' })
    expect(res.price).toBe(5)
  })

  it('getProducts - pobiera listę produktów i konwertuje price', async () => {
    const body = { category: 'c1', name: 'search' }
    const products = [
      { id: 'p1', price: { toNumber: () => 10 }, name: 'A' },
      { id: 'p2', price: { toNumber: () => 20 }, name: 'B' },
    ]
    ;(mockService.getProducts as jest.Mock).mockResolvedValue(products)

    const out = await controller.getProducts(10, 0, body)

    expect(mockService.getProducts).toHaveBeenCalledWith('c1', 10, 0, 'search')
    expect(out).toEqual([{ ...products[0], price: 10 }, { ...products[1], price: 20 }])
  })

  it('deleteProduct - usuwa produkt i konwertuje price', async () => {
    const deleted = { id: 'p', price: { toNumber: () => 7 } }
    ;(mockService.deleteProduct as jest.Mock).mockResolvedValue(deleted)

    const res = await controller.deleteProduct({ productId: 'p' })

    expect(mockService.deleteProduct).toHaveBeenCalledWith('p')
    expect(res.price).toBe(7)
  })

  it('changeProduct - aktualizuje i zwraca zaktualizowany produkt z konwersją price', async () => {
    const updated = { id: 'p', price: { toNumber: () => 12 } }
    ;(mockService.changeProduct as jest.Mock).mockResolvedValue(updated)

    const body = { productId: 'p', changes: { name: 'New' } }
    const res = await controller.changeProduct(body)

    expect(mockService.changeProduct).toHaveBeenCalledWith('p', { name: 'New' })
    expect(res.price).toBe(12)
  })
})
