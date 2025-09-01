import { makeAutoObservable } from 'mobx'

class ShiftStore {
  startDate: Date | null = null
  endDate: Date | null = null
  cash: number | null = null
  isStarted: boolean = false
  shiftId: string | null = null

  constructor() {
    makeAutoObservable(this)
  }
  setCash(cash: number) {
    this.cash = cash
  }
  startShift(shiftId: string) {
    this.isStarted = true
    this.shiftId = shiftId
    this.startDate = new Date()

  }
  endShift() {
    this.isStarted = false
    this.shiftId = null
    this.endDate = new Date()
  }



}
export const shiftStore = new ShiftStore()