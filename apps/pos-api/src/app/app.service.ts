// PL: Prosty serwis aplikacji — prosty serwis pomocniczy używany przez AppController
// PL: Zwykle trzymamy tutaj logikę niezwiązaną z domeną lub pomocnicze metody.
import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): string {
    return 'Nothing here blud'
  }
}
