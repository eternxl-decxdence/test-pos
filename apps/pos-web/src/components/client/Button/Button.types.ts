import { ReactNode } from 'react'

export interface IButton {
  label: string
  icon: ReactNode
  disabled: boolean
  auxClassNames: string
  action: () => any
  submit: boolean
}
