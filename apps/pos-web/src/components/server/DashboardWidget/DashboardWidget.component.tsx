import clsx from 'clsx'
import { ReactNode } from 'react'
import config from './DashboardWidget.config'

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
    <div className={clsx(auxClassNames, config.logic.composeStyles('container'))}>
      {title && (
        <>
          <span className={config.logic.composeStyles('title')}>{title}</span>
          <div className={config.logic.composeStyles('separator')} />
        </>
      )}
      {children}
    </div>
  )
}
