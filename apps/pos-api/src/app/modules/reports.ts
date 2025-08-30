import { ReportController } from "@controllers/reports";
import { Module } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { ReportService } from "@services/reports";

@Module({
  imports: [PrismaClient],
  providers: [ReportService],
  controllers: [ReportController]
})
export class ReportModule { }