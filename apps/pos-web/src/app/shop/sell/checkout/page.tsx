import { ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons'
import CheckoutList from '@components/client/CheckoutList/CheckoutList.component'
import CheckoutControls from '@components/client/CheckoutControls/CheckoutControls.component'

export default function CheckoutPage({ children }: { children: ReactNode }) {
  return (
    <div className="w-full p-4 h-full flex flex-col gap-2 bg-white border-x-1 border-sky-500 col-span-8 row-span-12 shadow-2xl">
      <span className="font-poppins text-sm font-medium text-sky-500">
        <FontAwesomeIcon icon={faBasketShopping} /> Koszyk
      </span>
      <div className="w-full h-full flex flex-row gap-2 ">
        <div className="w-5/7 h-full">
          <CheckoutList />
        </div>
        <div className="w-2/7 h-full">
          <CheckoutControls />
        </div>
      </div>
    </div>
  )
}
