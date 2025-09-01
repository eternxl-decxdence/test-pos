import { Controller, Body, Post, Patch, Get, Query, Param } from '@nestjs/common'
import { ShiftService } from '@services/shift'

@Controller('shifts')
export class ShiftController {
  constructor(private shiftService: ShiftService) { }

  @Post()
  async start(@Body() body: { cashStart: number }) {
    return await this.shiftService.start(body.cashStart)
  }
  @Patch(':shiftId')
  async end(@Param('shiftId') shiftId: string, @Body() body: { cashEnd: number }) {
    return await this.shiftService.end(body.cashEnd, shiftId)
  }
  @Get(':date')
  async get(@Param('date') date?: string) {
    const targetDate = date ?? new Date().toISOString().slice(0, 10)
    return await this.shiftService.get(targetDate)
  }
}
