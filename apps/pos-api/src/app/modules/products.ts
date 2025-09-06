// PL: Moduł produktów — rejestruje kontroler i serwis produktów oraz moduł Prisma

import { Module } from '@nestjs/common'
import { ProductsController } from '@controllers/products'
import { ProductsService } from '@services/products'
import { PrismaModule } from './prisma'

@Module({
  imports: [PrismaModule],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
