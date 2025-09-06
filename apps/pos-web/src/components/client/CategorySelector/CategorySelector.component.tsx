'use client'
import { observer } from 'mobx-react'
import { useState, useEffect } from 'react'
import { useProduct } from '@utils/hooks/useProduct'
import CategoryCard from '../CategoryCard/CategoryCard.component'

const CategorySelector = observer(() => {
  const { getCategories } = useProduct()

  const { isLoading, data } = getCategories()
  if (isLoading) return <div className="font-poppins text-xs text-slate-800">Loading..</div>
  console.log(data)
  return (
    <>
      {data.map((category: { id: string }) => {
        return <CategoryCard key={category.id} categoryId={category.id} />
      })}
    </>
  )
})
export default CategorySelector
