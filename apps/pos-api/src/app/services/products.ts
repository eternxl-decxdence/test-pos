import { Injectable } from '@nestjs/common'
import { Prisma, PrismaClient } from '@prisma/client'
import axios from 'axios'

// PL: Serwis produktów — operacje na produktach (synchronizacja z zewnętrznym API, CRUD)
// PL: Używa PrismaClient do operacji na bazie danych i axios do pobierania danych z serwisu zewnętrznego

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaClient) { }

  // PL: Synchronizuje produkty z zewnętrznego API (https://fakestoreapi.com/products).
  // PL: Dla każdego produktu tworzy/aktualizuje kategorię, tworzy obraz i upsertuje produkt.
  // PL: Operacja działa w transakcji Prisma; zwraca { message: 'database sync completed' } po zakończeniu.
  async syncProducts() {
    const { data } = await axios.get('https://fakestoreapi.com/products')

    await this.prisma.$transaction(async (prisma) => {
      for (const item of data) {
        const categoryName = item.category
          .toLowerCase()
          .split(' ')
          .filter(Boolean)
          .map((w) => w[0].toUpperCase() + w.slice(1))
          .join(' ')

        const category = await prisma.category.upsert({
          where: { categoryName },
          update: {},
          create: { categoryName },
        })

        const image = await prisma.image.create({
          data: { link: item.image },
        })

        await prisma.product.upsert({
          where: { externalId: item.id.toString() },
          update: {},
          create: {
            name: item.title,
            category: { connect: { id: category.id } },
            image: { connect: { id: image.id } },
            quantity: item.rating.count,
            price: new Prisma.Decimal(item.price),
            externalId: item.id.toString(),
          },
        })
      }
    })

    return { message: 'database sync completed' }
  }

  // PL: Pobiera listę produktów z opcjonalnym filtrem po kategorii i nazwie oraz paginacją.
  // PL: Parametry:
  // PL:  - category?: string — id kategorii do filtrowania
  // PL:  - limit?: number, offset?: number — paginacja
  // PL:  - name?: string — filtr po nazwie (insensitive contains)
  // PL: Zwraca tablicę obiektów produktu (Prisma models).
  async getProducts(category?: string, limit?: number, offset?: number, name?: string) {
    const products = await this.prisma.product.findMany({
      where: {
        ...(category ? { categoryId: category } : {}),
        ...(name ? { name: { contains: name, mode: 'insensitive' } } : {}),
      },
      ...(offset !== undefined ? { skip: offset } : {}),
      ...(limit !== undefined ? { take: limit } : {}),
    })
    return products
  }
  // PL: Tworzy produkt. Jeśli `category.new` jest true, tworzy nową kategorię, w przeciwnym razie łączy z istniejącą.
  // PL: Tworzy również wpis obrazu i zapisuje produkt z losowym externalId.
  // PL: Zwraca utworzony obiekt produktu (cena jako Prisma.Decimal).
  async addProduct(
    name: string,
    imageURL: string,
    price: number,
    quantity: number,
    category: { new: boolean; descriptor: string },
  ) {
    return this.prisma.$transaction(async (prisma) => {
      const productCategory = category.new
        ? await prisma.category.create({ data: { categoryName: category.descriptor } })
        : await prisma.category.findUnique({ where: { id: category.descriptor } })

      const image = await prisma.image.create({ data: { link: imageURL } })

      return prisma.product.create({
        data: {
          name,
          quantity,
          price: new Prisma.Decimal(price),
          category: { connect: { id: productCategory.id } },
          image: { connect: { id: image.id } },
        },
      })
    })
  }

  // PL: Usuwa produkt o podanym `productId` i zwraca usunięty rekord.
  async deleteProduct(productId: string) {
    return await this.prisma.product.delete({ where: { id: productId } })
  }
  // PL: Aktualizuje produkt wg podanych zmian. Może stworzyć nową kategorię/obraz, jeśli `new` = true.
  // PL: Zmiany mogą zawierać: name, image, category, price, quantity.
  // PL: Zwraca zaktualizowany rekord produktu.
  async changeProduct(
    productId: string,
    changes: {
      name?: string
      image?: { new: boolean; descriptor: string }
      category?: { new: boolean; descriptor: string }
      price?: number
      quantity?: number
    },
  ) {
    return await this.prisma.$transaction(async (prisma) => {
      const category = changes.category?.new
        ? await prisma.category.create({ data: { categoryName: changes.category.descriptor } })
        : await prisma.category.findUnique({ where: { id: changes.category.descriptor } })

      const image = changes.image?.new
        ? await prisma.image.create({ data: { link: changes.image.descriptor } })
        : await prisma.image.findUnique({ where: { id: changes.image.descriptor } })

      return await prisma.product.update({
        where: { id: productId },
        data: {
          ...(changes.name ? { name: changes.name } : {}),
          ...(changes.price ? { price: new Prisma.Decimal(changes.price) } : {}),
          ...(changes.quantity ? { quantity: changes.quantity } : {}),
          ...(category ? { category: { connect: { id: category.id } } } : {}),
          ...(image ? { image: { connect: { id: image.id } } } : {}),
        },
      })
    })
  }
}
