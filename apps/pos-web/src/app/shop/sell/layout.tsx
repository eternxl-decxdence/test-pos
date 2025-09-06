import { ReactNode } from 'react'

export default function SellLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid px-4 gap-2 h-full w-full grid-cols-8 grid-rows-[8px_repeat(11,_minmax(0,1fr))]">
      {children}
    </div>
  )
}
