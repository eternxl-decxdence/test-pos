import { Controller, Body, Post, Put } from '@nestjs/common'
import { ShiftService } from '@services/shift'

@Controller('shift')
export class ShiftController {
  constructor(private shiftServce: ShiftService) {}

  @Post()
  async start(@Body() body: { cashStart }) {
    return this.shiftServce.start(body.cashStart)
  }
  @Put()
  async end(@Body() body: { shiftId; cashEnd }) {
    return this.shiftServce.end(body.cashEnd, body.shiftId)
  }
}
