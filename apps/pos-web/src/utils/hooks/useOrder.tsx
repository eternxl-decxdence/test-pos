import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@utils/ApiClient'

type OrderItem = { product: string; quantity: number; price: number }
type Order = {
  id: string
  externalId?: string
  date?: string
  cashAmount?: number
  cardAmount?: number
  products?: Array<{ id: string; productId: string; quantity: number; price: number }>
}

const ORDERS_QUERY_KEY = ['orders']

async function fetchOrders(params?: {
  limit?: number
  offset?: number
  date?: string
  category?: string
  product?: string
}) {
  const res = await api.get('/orders', { params })
  return res.data as Order[]
}

async function postOrder(payload: {
  items: OrderItem[]
  cashAmount?: number
  cardAmount?: number
}) {
  const res = await api.post('/orders', payload)
  return res.data as Order
}

async function syncOrders() {
  const res = await api.post('/orders/imports')
  return res.data as Order[]
}

export function useOrders(params?: {
  limit?: number
  offset?: number
  date?: string
  category?: string
  product?: string
}) {
  return useQuery<Order[], Error>({
    queryKey: [...ORDERS_QUERY_KEY, params ?? {}],
    queryFn: () => fetchOrders(params),
    // intentionally minimal options; pagination caching handled by caller if needed
  })
}

export function useAddOrder() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: postOrder,
    onSuccess: () => qc.invalidateQueries({ queryKey: ORDERS_QUERY_KEY }),
  })
}

export function useSyncOrders() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: syncOrders,
    onSuccess: () => qc.invalidateQueries({ queryKey: ORDERS_QUERY_KEY }),
  })
}

// Imperative helpers for non-hook usage
export const orderClient = {
  list: fetchOrders,
  create: postOrder,
  sync: syncOrders,
}

export type { Order, OrderItem }
