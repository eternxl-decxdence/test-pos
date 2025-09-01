import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from '@modules/auth'
import { ShiftModule } from '@modules/shift'
import { APP_GUARD, Reflector } from '@nestjs/core'
import { JwtAuthGuard } from '@guards/auth'
import { ProductsModule } from '@modules/products'
import { OrderModule } from '@modules/order'
import { ReportModule } from '@modules/reports'

@Module({
  imports: [
    ReportModule,
    OrderModule,
    ProductsModule,
    AuthModule,
    ShiftModule,
  ],
  controllers: [AppController],
  providers: [Reflector, AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule { }
