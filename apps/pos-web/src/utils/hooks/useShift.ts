import { useMutation } from '@tanstack/react-query'
import { api } from '../ApiClient'

export function useShift() {
  const start = useMutation({
    mutationFn: async (data: { cashStart: number }) => {
      const res = await api.post('/shifts', data)
      return res.data
    },
  })

  const end = useMutation({
    mutationFn: async (data: { shiftId: string; cashEnd: number }) => {
      const res = await api.patch(`/shifts/${data.shiftId}`, { cashEnd: data.cashEnd })
      return res.data
    },
  })

  const get = useMutation({
    mutationFn: async (data: { date: string }) => {
      const res = await api.get(`/shifts/${data.date}`)
      return res.data
    }
  })

  return { start, end, get }
}