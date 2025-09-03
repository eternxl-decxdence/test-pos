'use client'
import { observer } from 'mobx-react'
import { ChangeEvent, useCallback, useState } from 'react'
import Input from '@components/server/Input/Input.component'
import { cartStore } from '@store/CartStore'
import { CategorizedProduct } from '../CategorizedProductSelector/CategorizedProductSelect.types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'

const SellProductItem = observer(({ product }: { product: CategorizedProduct }) => {
  const [qty, setQty] = useState(0)

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement> | number) => {
      const newValue = typeof e === 'number' ? e : Number(e.currentTarget.value)
      if (!Number.isNaN(newValue)) {
        setQty(newValue)
        cartStore.addToTempCart(product.name, newValue, product.price)
      }
    },
    [product.id, product.price],
  )
  return (
    <div className="h-24 w-full p-2 flex flex-row items-center justify-between border-slate-600">
      {/* Image + title */}
      <div className="flex flex-row items-center gap-4">
        <img src={product.image.link} alt={product.name} className="w-20 h-20 object-contain" />
        <p className="text-xs w-36 font-poppins text-slate-800 truncate">{product.name}</p>
      </div>

      {/* Price */}
      <span className="text-xs font-poppins text-slate-800">
        {product.price.toLocaleString('pl-PL', {
          style: 'currency',
          currency: 'PLN',
        })}
      </span>

      {/* Input */}
      <div className="flex flex-row gap-1 items-end">
        <button
          onClick={() => (qty > 0 ? handleChange(qty - 1) : null)}
          className="flex mb-2 justify-center items-center w-8 h-8"
        >
          <FontAwesomeIcon className="text-sky-500" icon={faMinus} />
        </button>
        <div className="w-16">
          <Input
            value={qty.toString()}
            label={`Na stanie: ${product.quantity} szt.`}
            handleChange={handleChange}
          />
        </div>
        <button
          onClick={() => handleChange(qty + 1)}
          className="flex mb-2 justify-center items-center w-8 h-8"
        >
          <FontAwesomeIcon className="text-sky-500" icon={faPlus} />
        </button>
      </div>
    </div>
  )
})

export default SellProductItem
