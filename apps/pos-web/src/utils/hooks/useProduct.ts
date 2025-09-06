import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@utils/ApiClient'

export function useProduct() {
  const queryClient = useQueryClient()

  // === GET ===
  const getCategories = () =>
    useQuery({
      queryKey: ['categories'],
      queryFn: async () => {
        const res = await api.get('/products/categories')
        return res.data
      },
    })

  const getProducts = (params: Partial<{ limit: number; offset: number; category: string; name: string }>) =>
    useQuery({
      queryKey: ['products', params],
      queryFn: async () => {
        const res = await api.get('/products', { params })
        return res.data
      },
    })

  // === POST ===
  const addProduct = useMutation({
    mutationFn: async (data: {
      name: string
      imageUrl: string
      price: number
      quantity: number
      category: { new: boolean; descriptor: string }
    }) => {
      const res = await api.post('/products', data)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })

  const importProducts = useMutation({
    mutationFn: async () => {
      const res = await api.post('/products/imports')
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })

  // === DELETE ===
  const deleteProduct = useMutation({
    mutationFn: async (data: { productId: string }) => {
      const res = await api.delete('/products', { data })
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })

  // === PATCH ===
  const changeProduct = useMutation({
    mutationFn: async (data: {
      productId: string
      changes: {
        name?: string
        image?: { new: boolean; descriptor: string }
        category?: { new: boolean; descriptor: string }
        price?: number
        quantity?: number
      }
    }) => {
      const res = await api.patch('/products', data)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })

  return {
    getCategories,
    getProducts,
    addProduct,
    importProducts,
    deleteProduct,
    changeProduct,
  }
}