import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from '@modules/auth'
import { ShiftModule } from '@modules/shift'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from '@guards/auth'
import { JwtModule } from '@nestjs/jwt'
import { ProductsModule } from '@modules/products'
import { OrderModule } from '@modules/order'

@Module({
  imports: [
    OrderModule,
    ProductsModule,
    AuthModule,
    ShiftModule,
    JwtModule.register({
      secret: process.env.ACCESS_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule { }
