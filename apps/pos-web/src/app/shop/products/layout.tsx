import { ReactNode } from 'react'

export default function ProductsLayout({ children }: { children: ReactNode }) {
  return <div className="flex p-4 flex-col w-full h-full">{children}</div>
}
