import { Body, Controller, Post, Get, Delete, Patch, Query, Param } from '@nestjs/common'
import { ProductsService } from '@services/products'

// PL: Kontroler produktów — obsługuje endpointy CRUD dla produktów
// PL: Deleguje logikę do ProductsService i konwertuje pola (np. price) przed zwróceniem odpowiedzi

@Controller('/products')
export class ProductsController {
  constructor(private productsService: ProductsService) { }

  // PL: Synchronizuje produkty z zewnętrznego serwisu i zapisuje/aktualizuje wpisy w bazie.
  // PL: Nie przyjmuje danych w ciele żądania — wyzwala proces serwisowy i zwraca wynik operacji.
  @Post('/imports')
  async sync() {
    return await this.productsService.syncProducts()
  }

  // PL: Tworzy nowy produkt.
  // PL: Oczekuje obiektu w body z polami: name, imageUrl, price, quantity oraz category (może być nowa lub istniejąca).
  // PL: Zwraca obiekt produktu, gdzie pole `price` jest sformatowane jako liczba (konwersja z Prisma.Decimal).
  @Post()
  async addProduct(
    @Body()
    body: {
      name: string
      imageUrl: string
      price: number
      quantity: number
      category: { new: boolean; descriptor: string }
    },
  ) {
    const product = await this.productsService.addProduct(
      body.name,
      body.imageUrl,
      body.price,
      body.quantity,
      body.category,
    )
    return { ...product, price: product.price.toNumber() }
  }

  // PL: Zwraca listę produktów z możliwością filtrowania po kategorii i nazwie oraz paginacją (limit, offset).
  // PL: Parametry: query params limit/offset, w body opcjonalne filtry category i name.
  // PL: Dla każdego produktu konwertuje `price` z Prisma.Decimal do liczby przed zwróceniem.
  @Get()
  async getProducts(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
    @Query('category') category?: string,
    @Query('name') name?: string,
  ) {
    const products = await this.productsService.getProducts(category, limit, offset, name)
    return products.map((product) => ({ ...product, price: product.price.toNumber() }))
  }

  // PL: Usuwa produkt o podanym `productId` (w body). Zwraca usunięty rekord z przekonwertowaną ceną.
  @Delete(':productId')
  async deleteProduct(@Param('productId') productId: string) {
    const product = await this.productsService.deleteProduct(productId)
    return { ...product, price: product.price.toNumber() }
  }

  // PL: Aktualizuje istniejący produkt. W body przekazujemy productId oraz obiekt `changes` z możliwymi polami do zmiany.
  // PL: W przypadku aktualizacji kategorii lub obrazu, kontroler oczekuje obiektu z polem `new` wskazującym czy stworzyć nowy wpis.
  // PL: Zwraca zaktualizowany produkt z `price` przekonwertowanym na liczbę.
  @Patch(':productId')
  async changeProduct(
    @Query('productId') productId: string,
    @Body()
    body: {
      changes: {
        name?: string
        image?: { new: boolean; descriptor: string }
        category?: { new: boolean; descriptor: string }
        price?: number
        quantity?: number
      }
    },
  ) {
    const product = await this.productsService.changeProduct(productId, body.changes)
    return { ...product, price: product.price.toNumber() }
  }
}
