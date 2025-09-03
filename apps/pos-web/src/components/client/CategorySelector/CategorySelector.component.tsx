'use client'
import { observer } from 'mobx-react'
import { useState, useEffect } from 'react'
import useProduct from '@utils/hooks/useProduct'
import CategoryCard from '../CategoryCard/CategoryCard.component'
const CategorySelector = observer(() => {
  const [categories, setCategories] = useState<string[]>([])
  const products = useProduct()
  useEffect(() => {
    products.getCategories.mutate(undefined, {
      onSuccess: (data: Array<{ id: string }>) => {
        setCategories(data.map((chunk) => chunk.id))
      },
    })
  }, [])
  return (
    <>
      {categories.map((cat) => {
        return <CategoryCard key={cat} categoryId={cat} />
      })}
    </>
  )
})
export default CategorySelector
