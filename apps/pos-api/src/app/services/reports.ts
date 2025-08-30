// Serwis odpowiedzialny za generowanie raportów sprzedażowych.

import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class ReportService {
  constructor(private prisma: PrismaClient) { }

  // getReports:
  // 1. Uruchamia transakcję, aby wykonać spójne zapytania agregujące i pobierające zamówienia w danym przedziale dat.
  // 2. Pobiera statystyki (liczba zamówień, suma płatności) za podany okres.
  // 3. Pobiera listę zamówień w okresie i dla każdego oblicza liczbę sprzedanych pozycji (orderProduct.aggregate)
  // 4. Zwraca obiekt zawierający statystyki oraz przetworzoną listę zamówień.
  async getReports(dateFrom: string, dateTo: string) {
    return this.prisma.$transaction(async (prisma) => {
      const stats = await prisma.order.aggregate({
        where: {
          date: {
            gte: new Date(dateFrom),
            lte: new Date(dateTo)
          }
        },
        _count: true,
        _sum: { cashAmount: true, cardAmount: true }
      })

      const orders = await prisma.order.findMany({
        where: {
          date: {
            gte: new Date(dateFrom),
            lte: new Date(dateTo)
          }
        }
      })

      return {
        stats,
        orders: await Promise.all(orders.map(async (order) => {
          return {
            id: order.id,
            date: order.date,
            cashAmount: order.cashAmount,
            cardAmount: order.cardAmount,
            // Dla każdego zamówienia agregujemy liczbę sprzedanych pozycji (orderProduct.aggregate)
            sold: (await prisma.orderProduct.aggregate({ where: { orderId: order.id }, _count: true }))._count
          }
        }))
      }
    })
  }

  // getFullReport:
  // 1. Oblicza łączną sumę płatności (cash/card) dla danego dnia.
  // 2. Pobiera identyfikatory zamówień z danego dnia.
  // 3. Grupuje dane orderProduct po productId, sumując ilości i ceny oraz licząc ilość wpisów.
  // 4. Pobiera pełne informacje o zamówieniach wraz z informacją o produkcie (nazwa itp.).
  // 5. Zwraca obiekt zawierający przychody, podsumowanie produktów i listę zamówień.
  async getFullReport(day: string) {
    const date = new Date(day)

    const payments = await this.prisma.order.aggregate({
      where: { date: new Date(day) },
      _sum: {
        cashAmount: true,
        cardAmount: true,
      },
    })

    const ordersOfDay = await this.prisma.order.findMany({
      where: { date },
      select: { id: true },
    })

    const orderIds = ordersOfDay.map(o => o.id)

    const productSummary = await this.prisma.orderProduct.groupBy({
      by: ['productId'],
      where: { orderId: { in: orderIds } },
      _sum: { quantity: true, price: true },
      _count: { _all: true },
    })

    const orders = await this.prisma.order.findMany({
      where: { date },
      include: {
        products: {
          include: {
            product: true, // aby widzieć nazwę produktu
          },
        },
      },
    })
    return {
      revenue: payments._sum,
      productSummary,
      orders: ordersOfDay,
    }
  }
}