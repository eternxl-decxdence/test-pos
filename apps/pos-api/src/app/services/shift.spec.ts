import { ShiftService } from './shift'
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
        update: jest.fn(),
      },
    } as unknown as PrismaClient

    svc = new ShiftService(mockPrisma)
    jest.clearAllMocks()
  })

  it('startShift - creates shift and returns id', async () => {
    ;(mockPrisma.shift.create as jest.Mock).mockResolvedValue({ id: 's1' })

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
    ;(mockPrisma.shift.findUnique as jest.Mock).mockResolvedValue(null)
    await expect(svc.end(200, 'id')).rejects.toThrow(NotFoundException)
  })

  it('endShift - updates and returns updated shift', async () => {
    const existing = { id: 'id', openedAt: new Date(), cashStart: 100 }
    ;(mockPrisma.shift.findUnique as jest.Mock).mockResolvedValue(existing)
    ;(mockPrisma.shift.update as jest.Mock).mockResolvedValue({
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
})
