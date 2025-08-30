/*
  Warnings:

  - A unique constraint covering the columns `[orderId,productId,quantity,price]` on the table `OrderProduct` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "OrderProduct_orderId_productId_quantity_price_key" ON "public"."OrderProduct"("orderId", "productId", "quantity", "price");
