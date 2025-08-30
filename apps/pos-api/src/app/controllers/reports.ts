import { Controller, Get, Param } from "@nestjs/common";
import { ReportService } from "@services/reports";


@Controller('/reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) { }

  @Get(':date')
  async getFullReport(@Param('date') date: string) {
    return this.reportService.getFullReport(date)
  }
  @Get(':dateFrom/:dateTo')
  async getShortReports(@Param('dateFrom') dateFrom: string, @Param('DateTo') dateTo: string) {
    return this.reportService.getReports(dateFrom, dateTo)
  }
}