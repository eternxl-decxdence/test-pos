import { ReportController } from "@controllers/reports";
import { Module } from "@nestjs/common";

import { ReportService } from "@services/reports";
import { PrismaModule } from "./prisma";

@Module({
  imports: [PrismaModule],
  providers: [ReportService],
  controllers: [ReportController]
})
export class ReportModule { }