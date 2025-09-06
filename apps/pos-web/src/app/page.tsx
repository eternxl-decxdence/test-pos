'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { authStore } from '@store/AuthStore'
import { observer } from 'mobx-react'

const IndexPage = observer(() => {
  const router = useRouter()

  useEffect(() => {
    if (!authStore.accessToken) {
      router.replace('/login') // или другая страница
    } else {
      router.replace('/shop/dashboard')
    }
  }, [authStore.accessToken, router])

  return <></>
})

export default IndexPage
