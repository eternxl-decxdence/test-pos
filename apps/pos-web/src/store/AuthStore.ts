import { makeAutoObservable, runInAction } from 'mobx'
import { api } from '@utils/ApiClient'

class AuthStore {
  accessToken: string | null = null
  isRefreshing: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  setAccessToken(token: string) {
    this.accessToken = token
  }
  async refresh() {
    if (this.isRefreshing) return
    this.isRefreshing = true
    try {
      const res = await api.post('/auth/refresh', {}, { withCredentials: true })
      runInAction(() => {
        this.accessToken = res.data.accessToken
      })
    } finally {
      runInAction(() => {
        this.isRefreshing = false
      })
    }
  }

  logout() {
    this.accessToken = null
  }
}

export const authStore = new AuthStore()
