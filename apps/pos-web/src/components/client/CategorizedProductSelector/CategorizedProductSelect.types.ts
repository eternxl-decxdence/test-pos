export interface CategorizedProduct {
  id: string
  name: string
  quantity: number
  price: number
  image: { link: string }
  category: { categoryName: string }
}