import { makeAutoObservable, observable } from "mobx";

class CartStore {
  tempCart = observable.map<string, { quantity: number, price: number, productId: string }>()
  mainCart = observable.map<string, { quantity: number, price: number, productId: string }>()

  constructor() {
    makeAutoObservable(this)
  }

  addToTempCart(productName: string, productId: string, quantity: number, price: number) {
    if (quantity > 0) this.tempCart.set(productName, { quantity, price, productId })
  }

  pushTempCartToMain() {
    this.tempCart.forEach((value, key) => {
      this.mainCart.set(key, value)
    })
    this.tempCart.clear()
  }
  clear() {
    this.tempCart.clear()
    this.mainCart.clear()
  }
}
export const cartStore = new CartStore()