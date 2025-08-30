import { ShiftService } from '../shift'
import { PrismaClient } from '@prisma/client'
import { NotFoundException } from '@nestjs/common'

describe('ShiftService', () => {
  let mockPrisma: any
  let svc: ShiftService

  beforeEach(() => {
    mockPrisma = {
      shift: {
        create: jest.fn(),
        findUnique: jest.fn(),
        findFirst: jest.fn(),
        update: jest.fn(),
      },
    } as unknown as PrismaClient

    svc = new ShiftService(mockPrisma)
    jest.clearAllMocks()
  })

  it('startShift - creates shift and returns id', async () => {
    ; (mockPrisma.shift.create as jest.Mock).mockResolvedValue({ id: 's1' })

    const res = await svc.start(100)

    expect(mockPrisma.shift.create).toHaveBeenCalledWith({
      data: {
        openedAt: expect.any(Date),
        cashStart: 100,
      },
    })
    expect(res).toEqual({ shift: 's1' })
  })

  it('endShift - not found throws', async () => {
    ; (mockPrisma.shift.findUnique as jest.Mock).mockResolvedValue(null)
    await expect(svc.end(200, 'id')).rejects.toThrow(NotFoundException)
  })

  it('endShift - updates and returns updated shift', async () => {
    const existing = { id: 'id', openedAt: new Date(), cashStart: 100 }
      ; (mockPrisma.shift.findUnique as jest.Mock).mockResolvedValue(existing)
      ; (mockPrisma.shift.update as jest.Mock).mockResolvedValue({
        id: 'id',
        cashEnd: 200,
        closedAt: new Date(),
      })

    const res = await svc.end(200, 'id')

    expect(mockPrisma.shift.update).toHaveBeenCalledWith({
      where: { id: 'id' },
      data: { cashEnd: 200, closedAt: expect.any(Date) },
    })
    expect(res).toEqual({ id: 'id', cashEnd: 200, closedAt: expect.any(Date) })
  })

  it('get - returns shift for given day', async () => {
    const day = '2025-08-20'
    const expectedDate = new Date(day + 'T00:00:00.000Z')
    const result = { id: 's2', openedAt: new Date() }
      ; (mockPrisma.shift.findFirst as jest.Mock).mockResolvedValue(result)

    const out = await svc.get(day)

    // Sprawdzamy, że findFirst został wywołany z oczekiwanymi parametrami
    expect(mockPrisma.shift.findFirst).toHaveBeenCalled()
    const callArg = (mockPrisma.shift.findFirst as jest.Mock).mock.calls[0][0]
    expect(callArg.orderBy).toEqual({ openedAt: 'desc' })
    // porównujemy czas w milisekundach
    expect(callArg.where.openedAt.lt.getTime()).toBe(expectedDate.getTime())
    expect(out).toBe(result)
  })
})
