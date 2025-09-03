import { useMutation } from '@tanstack/react-query'
import { api } from '@utils/ApiClient'

export default function useProduct() {
  const getCategories = useMutation({
    mutationFn: async () => {
      const res = await api.get('/products/categories')
      return res.data
    }
  })
  const getProducts = useMutation({
    mutationFn: async (data: Partial<{ limit: number, offset: number, category: string, name: string }>) => {
      const res = await api.get('/products', { params: { limit: data.limit, offset: data.offset, category: data.category, name: data.name } })
      return res.data
    }
  })
  return { getCategories, getProducts }
}