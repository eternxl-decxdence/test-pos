import { makeAutoObservable } from 'mobx'

class UserStore {
  greetname: string | null = null

  constructor() {
    makeAutoObservable(this)
  }

  setGreet(name: string) {
    this.greetname = name
  }
}

export const userStore = new UserStore()
