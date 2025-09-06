'use client'
import { cartStore } from '@store/CartStore'
import { observer } from 'mobx-react'
import config from './CheckoutList.config'
import { checkoutStore } from '@store/CheckoutStore'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
const CheckoutList = observer(() => {
  const router = useRouter()
  useEffect(() => {
    if (cartStore.mainCart.size <= 0) {
      router.push('/shop/sell')
    }
  }, [cartStore.mainCart.size])
  return (
    <div className={config.logic.composeStyles('main-container')}>
      <div className={config.logic.composeStyles('list-container')}>
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
            </div>
          )
        })}
      </div>

      <div className={config.logic.composeStyles('summary-container')}>
        <div className={config.logic.composeStyles('summary-entry')}>
          <span className={config.logic.composeStyles('summary-text')}>Razem</span>
          <hr className={config.logic.composeStyles('summary-divider')} />
          <span className={config.logic.composeStyles('summary-text')}>
            {Array.from(cartStore.mainCart.values())
              .reduce((sum, item) => sum + item.price * item.quantity, 0)
              .toLocaleString('pl-PL', { currency: 'PLN', style: 'currency' })}
          </span>
        </div>
        <div className={config.logic.composeStyles('summary-entry')}>
          <span className={config.logic.composeStyles('summary-text')}>Do zapłaty</span>
          <hr className={config.logic.composeStyles('summary-divider')} />
          <span className={config.logic.composeStyles('summary-text')}>
            {checkoutStore.payment.toLocaleString('pl-PL', { currency: 'PLN', style: 'currency' })}
          </span>
        </div>
      </div>
    </div>
  )
})

export default CheckoutList
