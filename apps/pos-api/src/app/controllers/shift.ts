import { Controller, Body, Post, Patch, Get, Query, Logger } from '@nestjs/common'
import { ShiftService } from '@services/shift'

@Controller('shift')
export class ShiftController {
  constructor(private shiftService: ShiftService) {}

  @Post()
  async start(@Body() body: { cashStart: number }) {
    Logger.log(body)
    return this.shiftService.start(body.cashStart)
  }
  @Patch()
  async end(@Body() body: { shiftId; cashEnd }) {
    return this.shiftService.end(body.cashEnd, body.shiftId)
  }
  @Get()
  async get(@Query('date') date?: string) {
    const targetDate = date ?? new Date().toISOString().slice(0, 10)
    return this.shiftService.get(targetDate)
  }
}
