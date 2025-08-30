// PL: Główny kontroler aplikacji (prosty przykład)
// PL: Udostępnia endpoint root do szybkiego testowania serwisu
import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }
}
