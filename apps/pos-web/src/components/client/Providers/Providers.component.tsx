'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'
import { ModalProvider } from '../ModalProvider/ModalProvider.component'

export default function Providers({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider />
      {children}
    </QueryClientProvider>
  )
}
