import { Module } from '@nestjs/common'
import { ShiftService } from '@services/shift'
import { ShiftController } from '@controllers/shift'
import { PrismaModule } from '@modules/prisma'

@Module({
  imports: [PrismaModule],
  providers: [ShiftService],
  controllers: [ShiftController],
})
export class ShiftModule {}
