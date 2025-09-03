import { makeAutoObservable, observable } from "mobx";




class CartStore {
  tempCart = observable.map<string, { quantity: number, price: number }>()
  mainCart = observable.map<string, { quantity: number, price: number }>()

  constructor() {
    makeAutoObservable(this)
  }

  addToTempCart(productId: string, quantity: number, price: number) {
    if (quantity > 0) this.tempCart.set(productId, { quantity, price })
  }

  pushTempCartToMain() {
    this.tempCart.forEach((value, key) => {
      this.mainCart.set(key, value)
    })
    this.tempCart.clear()
  }
}
export const cartStore = new CartStore()