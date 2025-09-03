'use client'
import DashboardWidget from '@components/server/DashboardWidget/DashboardWidget.component'
import useProduct from '@utils/hooks/useProduct'
import { observer } from 'mobx-react'
import { useCallback, useEffect, useState } from 'react'
import { CategorizedProduct } from './CategorizedProductSelect.types'
import SellProductItem from '../SellProductItem/SellProductItem.component'
import Button from '../Button/Button.component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { cartStore } from '@store/CartStore'
import { modalStore } from '@store/ModalStore'
import config from './CategorizedProductSelect.config'

const CategorizedProductSelect = observer(({ categoryId }: { categoryId: string }) => {
  const [page, setPage] = useState<{ total: number; current: number }>({ total: 0, current: 0 })
  const [products, setProducts] = useState<CategorizedProduct[]>([])

  const productApi = useProduct()

  useEffect(() => {
    productApi.getProducts.mutate(
      { category: categoryId, limit: 4, offset: page.current * 4 },
      {
        onSuccess: (data: { products: CategorizedProduct[]; totalPages: number }) => {
          setProducts(data.products)
          if (page.total <= 0) setPage({ current: 0, total: data.totalPages })
        },
      },
    )
  }, [page])

  const pageNext = useCallback(
    () => (page.current < page.total - 1 ? setPage({ ...page, current: page.current + 1 }) : null),
    [page],
  )

  const pagePrev = useCallback(
    () => (page.current > 0 ? setPage({ ...page, current: page.current - 1 }) : null),
    [page],
  )

  return (
    <DashboardWidget
      title={`Kategoria  ${products[0] ? products[0].category.categoryName : ''}`}
      auxClassNames="w-xl flex flex-col justify-between items-start "
    >
      <div className={config.logic.composeStyles('product-list')}>
        {products.map((product) => {
          return <SellProductItem key={product.id} product={product} />
        })}
      </div>
      <div className="flex w-full flex-row justify-center items-center">
        <Button
          action={pagePrev}
          auxClassNames="p-1"
          icon={<FontAwesomeIcon icon={faCaretLeft} />}
        />
        <span className={config.logic.composeStyles('page-label')}>{page.current + 1}</span>
        <Button
          action={pageNext}
          auxClassNames="p-1"
          icon={<FontAwesomeIcon icon={faCaretRight} />}
        />
      </div>
      <Button
        action={() => {
          modalStore.hide(categoryId)
          cartStore.pushTempCartToMain()
        }}
        label="Dodaj produkty"
        auxClassNames="px-4 py-1"
      />
    </DashboardWidget>
  )
})

export default CategorizedProductSelect
