import { ProductsService } from '../products'
import { PrismaClient } from '@prisma/client'
import axios from 'axios'

jest.mock('axios')

describe('ProductsService', () => {
  let svc: ProductsService
  let mockPrisma: any

  beforeEach(() => {
    // PL: Tworzymy atrapę PrismaClient z podstawowymi metodami używanymi w serwisie
    mockPrisma = {
      $transaction: jest.fn().mockImplementation((fn) => fn(mockPrisma)),
      category: { upsert: jest.fn(), create: jest.fn(), findUnique: jest.fn() },
      image: { create: jest.fn(), findUnique: jest.fn() },
      product: { upsert: jest.fn(), findMany: jest.fn(), create: jest.fn(), delete: jest.fn(), update: jest.fn() },
    } as unknown as PrismaClient

    svc = new ProductsService(mockPrisma)
    jest.clearAllMocks()
  })

  it('syncProducts - pobiera i synchronizuje listę produktów', async () => {
    // PL: Przygotowujemy atrapę odpowiedzi z zewnętrznego API
    ; (axios.get as jest.Mock).mockResolvedValue({
      data: [
        { id: 1, title: 'Prod A', category: 'electronics', image: 'http://img', price: 9.99, rating: { count: 5 } },
      ],
    })

      ; (mockPrisma.category.upsert as jest.Mock).mockResolvedValue({ id: 'c1', categoryName: 'Electronics' })
      ; (mockPrisma.image.create as jest.Mock).mockResolvedValue({ id: 'img1', link: 'http://img' })
      ; (mockPrisma.product.upsert as jest.Mock).mockResolvedValue({ id: 'p1' })

    const res = await svc.syncProducts()

    expect(axios.get).toHaveBeenCalledWith('https://fakestoreapi.com/products')
    expect(mockPrisma.category.upsert).toHaveBeenCalled()
    expect(mockPrisma.image.create).toHaveBeenCalled()
    expect(mockPrisma.product.upsert).toHaveBeenCalled()
    expect(res).toEqual({ message: 'database sync completed' })
  })

  it('getProducts - zwraca listę produktów z filtrami i paginacją', async () => {
    const mockProducts = [
      { id: 'p1', price: { toNumber: () => 10 }, name: 'A' },
      { id: 'p2', price: { toNumber: () => 20 }, name: 'B' },
    ]
      ; (mockPrisma.product.findMany as jest.Mock).mockResolvedValue(mockProducts)

    const out = await svc.getProducts('cat1', 10, 0, 'A')

    expect(mockPrisma.product.findMany).toHaveBeenCalled()
    expect(out).toBe(mockProducts)
  })

  it('addProduct - tworzy produkt z nową kategorią i obrazem', async () => {
    ; (mockPrisma.category.create as jest.Mock).mockResolvedValue({ id: 'c_new', categoryName: 'NewCat' })
      ; (mockPrisma.image.create as jest.Mock).mockResolvedValue({ id: 'img_new', link: 'http://img' })
      ; (mockPrisma.product.create as jest.Mock).mockResolvedValue({ id: 'p_new', price: new (require('@prisma/client').Prisma).Decimal(5) })

    const res = await svc.addProduct('Name', 'http://img', 5, 1, { new: true, descriptor: 'NewCat' })

    expect(mockPrisma.category.create).toHaveBeenCalled()
    expect(mockPrisma.image.create).toHaveBeenCalled()
    expect(mockPrisma.product.create).toHaveBeenCalled()
    expect(res).toBeDefined()
  })

  it('deleteProduct - usuwa produkt', async () => {
    ; (mockPrisma.product.delete as jest.Mock).mockResolvedValue({ id: 'p_del', price: { toNumber: () => 7 } })

    const res = await svc.deleteProduct('p_del')

    expect(mockPrisma.product.delete).toHaveBeenCalledWith({ where: { id: 'p_del' } })
    expect(res).toBeDefined()
  })

  it('changeProduct - aktualizuje produkt z nową kategorią i obrazem', async () => {
    ; (mockPrisma.category.create as jest.Mock).mockResolvedValue({ id: 'c_new2' })
      ; (mockPrisma.image.create as jest.Mock).mockResolvedValue({ id: 'img_new2' })
      ; (mockPrisma.product.update as jest.Mock).mockResolvedValue({ id: 'p_upd' })

    const res = await svc.changeProduct('p', {
      name: 'NewName',
      price: 12,
      quantity: 2,
      category: { new: true, descriptor: 'X' },
      image: { new: true, descriptor: 'http://img' },
    })

    expect(mockPrisma.product.update).toHaveBeenCalled()
    expect(res).toBeDefined()
  })
})
