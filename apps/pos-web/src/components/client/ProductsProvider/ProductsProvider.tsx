'use client'

import { useState, useCallback } from 'react'
import Product from '../Product/Product.component'
import { useProduct } from '@utils/hooks/useProduct'
import Button from '../Button/Button.component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'

export default function ProductsProvider() {
  const [page, setPage] = useState(0)
  const { getProducts } = useProduct()

  const { data, isLoading } = getProducts({ limit: 8, offset: page * 8 })

  const pageNext = useCallback(
    () => (page < (data?.totalPages ?? 1) - 1 ? setPage((prev) => prev + 1) : null),
    [page, data?.totalPages],
  )

  const pagePrev = useCallback(() => (page > 0 ? setPage((prev) => prev - 1) : null), [page])

  if (isLoading || !data) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex flex-col gap-0 divide-y-1 divide-slate-800">
        {data.products.map(
          (product: {
            name: string
            category: { categoryName: string }
            price: number
            quantity: number
            image: { link: string }
          }) => (
            <Product
              key={product.name}
              name={product.name}
              category={product.category.categoryName}
              price={product.price}
              quantity={product.quantity}
              imageHref={product.image.link}
            />
          ),
        )}
      </div>
      <div className="pt-2 flex w-full flex-row gap-4 justify-center items-center">
        <Button
          action={pagePrev}
          auxClassNames="p-1"
          icon={<FontAwesomeIcon icon={faCaretLeft} />}
          disabled={page === 0}
        />
        <span className="font-poppins text-sky-500 font-semibold text-xs">{page + 1}</span>
        <Button
          action={pageNext}
          auxClassNames="p-1"
          icon={<FontAwesomeIcon icon={faCaretRight} />}
          disabled={page >= data.totalPages - 1}
        />
      </div>
    </div>
  )
}
