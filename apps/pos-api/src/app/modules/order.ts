import { OrderController } from "@controllers/orders";
import { Module } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { OrderService } from "@services/orders";


@Module({
  imports: [PrismaClient],
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule { }