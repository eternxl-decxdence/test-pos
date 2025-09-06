import axios from 'axios'
import { authStore } from '@store/AuthStore'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'nothing',
  withCredentials: true
})

api.interceptors.request.use((config) => {
  if (authStore.accessToken) config.headers.Authorization = `Bearer ${authStore.accessToken}`

  return config
})
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        await authStore.refresh()
        originalRequest.headers.Authorization = `Bearer ${authStore.accessToken}`
        return api(originalRequest)
      } catch (err) {
        authStore.logout()
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  },
)
