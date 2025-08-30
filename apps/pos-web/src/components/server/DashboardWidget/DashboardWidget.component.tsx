import clsx from 'clsx'
import { ReactNode } from 'react'

export default function DashboardWidget({
  children,
  auxClassNames,
  title,
}: {
  title?: string
  children?: ReactNode
  auxClassNames?: string
}) {
  return (
    <div
      className={clsx(
        auxClassNames,
        'outline-1 flex flex-col gap-1 outline-sky-500 rounded-md bg-sky-50 shadow-xl p-2',
      )}
    >
      <span className="text-xs font-poppins leading-none">{title}</span>
      <div className="w-full h-px bg-slate-500 rounded-full" />
      {children}
    </div>
  )
}
