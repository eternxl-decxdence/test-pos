import { useMutation } from '@tanstack/react-query'
import { api } from './ApiClient'

export function useShift() {
  const start = useMutation({
    mutationFn: async (data: { cashStart: number }) => {
      const res = await api.post('/shift/start', data)
      return res.data
    },
  })

  const end = useMutation({
    mutationFn: async (data: { shiftId: string; cashEnd: number }) => {
      const res = await api.patch(`/shift/${data.shiftId}/end`, { cashEnd: data.cashEnd })
      return res.data
    },
  })

  return { start, end }
}
