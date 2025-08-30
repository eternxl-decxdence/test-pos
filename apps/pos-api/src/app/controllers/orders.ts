// Plik: controllers/orders.ts
// Ten kontroler obsługuje żądania związane z zamówieniami (orders).
// Komentarze w języku polskim opisują każdy publiczny endpoint i jego przeznaczenie,
// aby osoba dołączająca do projektu szybko zrozumiała zachowanie metod.

import { Controller, Post, Get, Body, Query } from '@nestjs/common'
import { OrderService } from '@services/orders';

@Controller('/orders')
export class OrderController {
  // Wstrzykujemy serwis zamówień przez konstruktor. Serwis wykonuje logikę biznesową i operacje na bazie.
  constructor(private orderService: OrderService) { }

  // Endpoint POST /orders/sync
  // Synchronizuje lokalne zamówienia z zewnętrznym API (np. pobiera koszyki z serwisu)
  // Zwraca wynik operacji synchronizacji z serwisu.
  @Post('/sync')
  async syncOrders() {
    return this.orderService.syncOrders()
  }

  // Endpoint POST /orders
  // Dodaje nowe zamówienie. Oczekuje w body tablicy pozycji (items) z polami: product, quantity, price
  // Opcjonalnie można podać kwoty: cashAmount i cardAmount.
  // Metoda jest pusta w oryginale - implementacja biznesowa znajduje się w OrderService.
  @Post()
  async addOrder(@Body() body: { items: { product: string, quantity: number, price: number }[], cashAmount?: number, cardAmount?: number }) {

  }

  // Endpoint GET /orders
  // Pobiera listę zamówień z opcjonalnymi parametrami limit, offset, date oraz filtrami category i product.
  // Serwis zwraca pola typu Prisma.Decimal dla cashAmount i cardAmount - tutaj konwertujemy je na number
  // aby frontend otrzymał zwykłe liczby.
  @Get()
  async getOrders(@Query('limit') limit, @Query('offset') offset, @Query('date') date, @Body() body: { category: string, product: string }) {
    const orders = await this.orderService.getOrders(limit, offset, date, body.category, body.product)
    return orders.map((order) => { return { ...order, cashAmount: order.cashAmount.toNumber(), cardAmount: order.cardAmount.toNumber() } })
  }
}