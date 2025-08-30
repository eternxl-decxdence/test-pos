import { makeAutoObservable } from 'mobx'

class ShiftStore {
  cash: number | null = null

  setCash(cash: number) {
    this.cash = cash
  }
}
