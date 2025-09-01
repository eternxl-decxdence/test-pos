import { useMutation } from '@tanstack/react-query'
import { api } from '../ApiClient'

export default function useLogin() {
  return useMutation({
    mutationFn: async (data: { username: string; password: string }) => {
      const res = await api.post('/auth/login', data, {
        withCredentials: true,
      })
      return res.data
    },
  })
}
