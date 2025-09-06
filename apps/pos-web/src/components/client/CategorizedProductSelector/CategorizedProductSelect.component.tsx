'use client'
import DashboardWidget from '@components/server/DashboardWidget/DashboardWidget.component'
import { useProduct } from '@utils/hooks/useProduct'
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

const PAGE_SIZE = 4

const CategorizedProductSelect = observer(({ categoryId }: { categoryId: string }) => {
  const [page, setPage] = useState(0)

  const { getProducts } = useProduct()

  const { data, isLoading, isError } = getProducts({
    category: categoryId,
    limit: PAGE_SIZE,
    offset: page * PAGE_SIZE,
  })

  const products: CategorizedProduct[] = data?.products ?? []
  const totalPages = data?.totalPages ?? 0

  const pageNext = useCallback(
    () => (page < totalPages - 1 ? setPage((prev) => prev + 1) : null),
    [page, totalPages],
  )

  const pagePrev = useCallback(() => (page > 0 ? setPage((prev) => prev - 1) : null), [page])

  return (
    <DashboardWidget
      title={`Kategoria ${products[0] ? products[0].category.categoryName : ''}`}
      auxClassNames="w-xl flex flex-col justify-between items-start "
    >
      {isLoading && <div>Ładowanie...</div>}
      {isError && <div>Błąd wczytywania produktów</div>}

      <div className={config.logic.composeStyles('product-list')}>
        {products.map((product) => (
          <SellProductItem key={product.id} product={product} />
        ))}
      </div>

      <div className="flex w-full flex-row justify-center items-center">
        <Button
          action={pagePrev}
          auxClassNames="p-1"
          icon={<FontAwesomeIcon icon={faCaretLeft} />}
          disabled={page === 0}
        />
        <span className={config.logic.composeStyles('page-label')}>{page + 1}</span>
        <Button
          action={pageNext}
          auxClassNames="p-1"
          icon={<FontAwesomeIcon icon={faCaretRight} />}
          disabled={page >= totalPages - 1}
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
