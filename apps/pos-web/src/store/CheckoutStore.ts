import { makeAutoObservable } from "mobx";
import { cartStore } from "./CartStore";

class CheckoutStore {
  atCheckout: boolean = false
  payment: number = 0
  card: number = 0
  cash: number = 0
  constructor() {
    makeAutoObservable(this)
  }

  proceedToPayment() {
    this.atCheckout = true
    this.payment = Array.from(cartStore.mainCart.values()).reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    )
  }
  reset() {
    this.atCheckout = false
    this.payment = 0
    this.card = 0
    this.cash = 0
  }
  payWithCard(amount: number) {
    if (!amount) {
      this.card += this.payment
      this.payment = 0
    }
    else {
      this.payment -= amount
      this.card += amount
    }
  }
  payWithCash(amount: number) {
    this.payment -= amount
    this.cash += amount
  }
}
export const checkoutStore = new CheckoutStore()