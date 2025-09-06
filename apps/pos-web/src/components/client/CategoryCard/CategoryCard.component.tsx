'use client'

import DashboardWidget from '@components/server/DashboardWidget/DashboardWidget.component'
import { observer } from 'mobx-react'
import { motion } from 'motion/react'
import { modalStore } from '@store/ModalStore'
import CategorizedProductSelect from '../CategorizedProductSelector/CategorizedProductSelect.component'
import { useProduct } from '@utils/hooks/useProduct'

const CategoryCard = observer(({ categoryId }: { categoryId: string }) => {
  const { getProducts } = useProduct()

  const { data, isLoading } = getProducts({
    limit: 1,
    offset: 0,
    category: categoryId,
  })

  const imageHref = data?.products?.[0]?.image?.link ?? null
  const category = data?.products?.[0]?.category?.categoryName ?? null

  function handleCategorySelect() {
    modalStore.show(() => <CategorizedProductSelect categoryId={categoryId} />, categoryId)
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="row-span-3 row-start-2"
      onClick={handleCategorySelect}
    >
      <DashboardWidget auxClassNames="pt-4 h-full justify-between">
        {isLoading ? (
          <div className="flex items-center justify-center h-20 text-slate-500 text-xs">
            Loading...
          </div>
        ) : (
          <>
            <img
              className="max-h-20 max-w-full object-contain"
              src={imageHref ?? undefined}
              alt={category ?? 'Category image'}
            />
            <div className="flex flex-col justify-center items-center gap-2">
              <div className="w-full h-px bg-slate-500" />
              <span className="font-poppins w-full text-center text-xs text-slate-800">
                {category}
              </span>
            </div>
          </>
        )}
      </DashboardWidget>
    </motion.div>
  )
})

export default CategoryCard
