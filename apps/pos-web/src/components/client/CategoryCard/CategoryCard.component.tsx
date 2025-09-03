'use client'
import DashboardWidget from '@components/server/DashboardWidget/DashboardWidget.component'
import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import useProduct from '@utils/hooks/useProduct'
import { motion } from 'motion/react'
import { modalStore } from '@store/ModalStore'

import CategorizedProductSelect from '../CategorizedProductSelector/CategorizedProductSelect.component'

const CategoryCard = observer(({ categoryId }: { categoryId: string }) => {
  const [imageHref, setImageHref] = useState<string | null>(null)
  const [category, setCategory] = useState<string | null>(null)

  const product = useProduct()

  useEffect(() => {
    product.getProducts.mutate(
      { limit: 1, offset: 0, category: categoryId },
      {
        onSuccess: (data: {
          products: {
            image: { id: string; link: string }
            category: { id: string; categoryName: string }
          }[]
        }) => {
          setImageHref(data.products[0].image.link)
          setCategory(data.products[0].category.categoryName)
        },
      },
    )
  }, [])

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
        <img
          className="max-h-20 max-w-full object-contain"
          src={imageHref ? imageHref : undefined}
        />
        <div className="flex flex-col justify-center items-center  gap-2">
          <div className="w-full h-px bg-slate-500" />
          <span className="font-poppins w-full text-center text-xs text-slate-800">{category}</span>
        </div>
      </DashboardWidget>
    </motion.div>
  )
})
export default CategoryCard
