import { Controller, Get, Param, Query } from "@nestjs/common";
import { ReportService } from "@services/reports";


@Controller('/reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) { }

  @Get(':date')
  async getFullReport(@Param('date') date: string) {
    return await this.reportService.getFullReport(date)
  }
  @Get()
  async getShortReports(@Query('from') dateFrom: string, @Query('to') dateTo: string) {
    return await this.reportService.getReports(dateFrom, dateTo)
  }
}