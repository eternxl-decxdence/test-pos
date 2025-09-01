import { OrderController } from "@controllers/orders";
import { Module } from "@nestjs/common";
import { OrderService } from "@services/orders";
import { PrismaModule } from "./prisma";


@Module({
  imports: [PrismaModule],
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule { }