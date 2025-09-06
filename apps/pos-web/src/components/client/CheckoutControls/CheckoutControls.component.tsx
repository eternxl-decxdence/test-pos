'use client'
import { observer } from 'mobx-react'
import config from './CheckoutControls.config'
import Button from '../Button/Button.component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCreditCard, faMoneyBills } from '@fortawesome/free-solid-svg-icons'
import Input from '@components/server/Input/Input.component'
import { useEffect, useState } from 'react'
import { cartStore } from '@store/CartStore'
import { checkoutStore } from '@store/CheckoutStore'
import { useAddOrder, OrderItem } from '@utils/hooks/useOrder'
import { useRouter } from 'next/navigation'

const CheckoutControls = observer(() => {
  const addOrder = useAddOrder()
  const router = useRouter()

  useEffect(() => {
    if (checkoutStore.payment <= 0 && checkoutStore.atCheckout) {
      const items: OrderItem[] = Array.from(cartStore.mainCart.entries()).map(([key, value]) => {
        return { product: value.productId, quantity: value.quantity, price: value.price }
      })
      console.log(items)
      addOrder.mutate(
        {
          items,
          cashAmount: checkoutStore.cash,
          cardAmount: checkoutStore.card,
        },
        {
          onSuccess: (res) => {
            console.log('Order created', res)
            checkoutStore.reset()
            cartStore.clear()
            router.push('/shop/sell')
          },
        },
      )
    }
  }, [checkoutStore.payment])
  const [money, setMoney] = useState(0)
  return (
    <div className={config.logic.composeStyles('main-container')}>
      <Button
        action={() => cartStore.clear()}
        label="Anuluj Zamówienie"
        auxClassNames="py-2 px-20"
      />
      <div className="flex flex-col gap-2">
        <Input
          inputType="number"
          handleChange={(e) => {
            console.log(e.target.value)
            setMoney(parseFloat(e.target.value))
          }}
          label="Kwota"
          placeholder="Wprowadź kwotę"
        />
        <div className="flex flex-row gap-2">
          <Button
            label="Gotówka"
            auxClassNames="py-4 px-8"
            icon={<FontAwesomeIcon icon={faMoneyBills} />}
            action={() => checkoutStore.payWithCash(money)}
          />
          <Button
            label="Karta"
            auxClassNames="py-4 px-10"
            icon={<FontAwesomeIcon icon={faCreditCard} />}
            action={() => checkoutStore.payWithCard(money)}
          />
        </div>
      </div>
    </div>
  )
})
export default CheckoutControls
