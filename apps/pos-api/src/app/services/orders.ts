// Plik: services/orders.ts
// Serwis odpowiedzialny za logikę biznesową związaną z zamówieniami.
// Komentarze w języku polskim wyjaśniają krok po kroku, co robi każda metoda:
// - syncOrders: synchronizuje zamówienia z zewnętrznego API i zapisuje/aktualizuje dane w bazie
// - addOrder: tworzy nowe zamówienie wraz z pozycjami
// - getOrders: pobiera zamówienia z opcjonalnymi filtrami i paginacją

import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import axios from 'axios';

@Injectable()
export class OrderService {
  // Konstruktor otrzymuje instancję PrismaClient, która jest używana do operacji na bazie danych.
  constructor(private prisma: PrismaClient) { }

  // syncOrders:
  // 1. Pobiera dane koszyków z zewnętrznego API (axios.get)
  // 2. W ramach transakcji przetwarza każdy koszyk:
  //    - tworzy lub aktualizuje zamówienie (order.upsert)
  //    - dla każdej pozycji znajduje produkt po externalId (product.findUniqueOrThrow)
  //    - tworzy/aktualizuje wpis orderProduct
  //    - oblicza całkowitą cenę i zapisuje ją w polu cardAmount
  // 3. Zwraca tablicę przetworzonych zamówień
  async syncOrders() {
    const { data } = await axios.get('https://fakestoreapi.com/carts');

    return await this.prisma.$transaction(async (prisma) => {
      const results = [];

      for (const cart of data) {
        const order = await prisma.order.upsert({
          where: { externalId: cart.id.toString() },
          update: {},
          create: {
            externalId: cart.id.toString(),
            date: new Date(cart.date),
          },
          include: { products: true },
        });


        const orderProducts = await Promise.all(
          cart.products.map(async (op) => {
            // Szukamy produktu po externalId; jeśli nie istnieje, rzucamy NotFoundException
            const product = await prisma.product.findUnique({
              where: { externalId: op.productId.toString() },
            },).catch(() => { throw new NotFoundException(`Product with externalId ${op.productId} not found OP:${JSON.stringify(op)} Cart:${JSON.stringify(cart)}`) });
            if (!product) {
              throw new NotFoundException(
                `Product with externalId ${op.productId} not found`,
              );
            }

            return prisma.orderProduct.upsert({
              where: {
                orderId_productId_quantity_price: {
                  orderId: order.id,
                  productId: product.id,
                  quantity: op.quantity,
                  price: product.price,
                },
              },
              update: {},
              create: {
                externalId: op.productId.toString(),
                orderId: order.id,
                productId: product.id,
                quantity: op.quantity,
                price: product.price,
              },
            });
          }),
        );

        await Promise.all(orderProducts);


        const totalPrice = cart.products.reduce((sum, op) => {
          const product = orderProducts.find((p) => p.productId === op.id);
          return sum + Number(product?.price ?? 0) * op.quantity;
        }, 0);

        await prisma.order.update({
          where: { id: order.id },
          data: { cardAmount: new Prisma.Decimal(totalPrice) },
        });

        results.push(order);
      }

      return results;
    });
  }


  // addOrder:
  // Tworzy nowe zamówienie oraz rekordy orderProduct dla każdej pozycji.
  // - Otwiera transakcję
  // - Tworzy zamówienie z opcjonalnymi polami cashAmount / cardAmount (Prisma.Decimal)
  // - Tworzy odpowiednie wpisy orderProduct
  // - Zwraca pełne zamówienie razem z produktami
  async addOrder(
    items: { product: string; quantity: number; price: number }[],
    cashAmount?: number,
    cardAmount?: number,
  ) {
    return await this.prisma.$transaction(async (prisma) => {
      const order = await prisma.order.create({
        data: {
          ...(cashAmount
            ? { cashAmount: new Prisma.Decimal(cashAmount) }
            : {}),
          ...(cardAmount
            ? { cardAmount: new Prisma.Decimal(cardAmount) }
            : {}),
        },
      });

      await Promise.all(
        items.map(async (item) => {
          await prisma.product.update({
            where: { id: item.product }, data: {
              quantity: {
                decrement: item.quantity
              }
            }
          })
          await prisma.orderProduct.create({
            data: {
              orderId: order.id,
              productId: item.product,
              quantity: item.quantity,
              price: new Prisma.Decimal(item.price),
            },
          })
        }
        ),
      );

      return prisma.order.findUnique({
        where: { id: order.id },
        include: { products: true },
      });
    });
  }

  // getOrders:
  // Pobiera zamówienia z opcjonalnymi filtrami: limit, offset, date, category, product.
  // Jeśli podany jest filtr product lub category, tworzy odpowiedni warunek w relacji products.some
  // Zwraca zamówienia razem z powiązanymi produktami (include: { products: true })
  async getOrders(
    limit?: number,
    offset?: number,
    date?: string,
    category?: string,
    product?: string,
  ) {
    return this.prisma.order.findMany({
      where: {
        ...(product || category
          ? {
            products: {
              some: {
                ...(product ? { productId: product } : {}),
                ...(category ? { product: { categoryId: category } } : {}),
              },
            },
          }
          : {}),
        ...(date ? { date: new Date(date) } : {}),
      },
      ...(offset !== undefined ? { skip: offset } : {}),
      ...(limit !== undefined ? { take: limit } : {}),
      include: { products: true },
    });
  }
}
