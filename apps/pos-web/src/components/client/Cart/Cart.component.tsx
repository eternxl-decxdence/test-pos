'use client'

import { observer } from 'mobx-react'
import { cartStore } from '@store/CartStore'
import config from './Cart.config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faShoppingBasket } from '@fortawesome/free-solid-svg-icons'
import Button from '../Button/Button.component'
import { useRouter } from 'next/navigation'
import { checkoutStore } from '@store/CheckoutStore'
const Cart = observer(() => {
  const router = useRouter()
  if (cartStore.mainCart.size > 0)
    return (
      <div className={config.logic.composeStyles('grid-child-container')}>
        <div className={config.logic.composeStyles('main-container')}>
          <span className={config.logic.composeStyles('label')}>
            <FontAwesomeIcon className="mr-2" icon={faShoppingBasket} />
            Koszyk
          </span>
          <div className={config.logic.composeStyles('cart-container')}>
            {Array.from(cartStore.mainCart.entries()).map(([key, value]) => {
              return (
                <div key={key} className={config.logic.composeStyles('product-entry')}>
                  <span className={config.logic.composeStyles('product-name')}>{key}</span>
                  <span className={config.logic.composeStyles('product-qty')}>
                    {`x${value.quantity}`}
                  </span>
                  <span className={config.logic.composeStyles('product-price')}>
                    {value.price.toLocaleString('pl-PL', { currency: 'PLN', style: 'currency' })}
                  </span>
                  <button
                    className={config.logic.composeStyles('product-remove-button')}
                    onClick={() => cartStore.mainCart.delete(key)}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                </div>
              )
            })}
          </div>
          <Button
            action={() => {
              checkoutStore.proceedToPayment()
              router.push('./sell/checkout')
            }}
            label="Suma"
            auxClassNames="px-38 py-4"
          />
        </div>
      </div>
    )
})

export default Cart
