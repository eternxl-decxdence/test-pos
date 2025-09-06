import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaClient, Prisma } from '@prisma/client'

@Injectable()
export class ShiftService {
  constructor(private prisma: PrismaClient) { }

  async start(cashStart: number) {
    const shift = await this.prisma.shift.create({
      data: {
        openedAt: new Date(),
        cashStart: new Prisma.Decimal(cashStart),
      },
    })
    return { shift: shift.id }
  }
  async end(cashEnd: number, shiftId: string) {
    const shift = await this.prisma.shift.findUnique({ where: { id: shiftId } })
    if (!shift) throw new NotFoundException('Zmiana z podanym id nie została znaleziona')
    return await this.prisma.shift.update({
      where: { id: shift.id },
      data: {
        cashEnd: new Prisma.Decimal(cashEnd),
        closedAt: new Date(),
      },
    })
  }
  async get(day: string) {
    const date = new Date(day + 'T00:00:00.000Z')
    return await this.prisma.shift.findFirst({
      where: { openedAt: { lt: date } },
      orderBy: {
        openedAt: 'desc',
      },
    })
  }
}
