import { Module } from '@nestjs/common'
import { ShiftService } from '@services/shift'
import { ShiftController } from '@services/shift'

@Module({
  imports: [PrismaModule],
  providers: [ShiftService],
  controllers: [ShiftController],
})
export class ShiftModule {}
