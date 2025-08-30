import { ReactNode } from 'react'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <div className="grid h-full w-full grid-cols-3 grid-rows-4 gap-2 p-2">{children}</div>
}
