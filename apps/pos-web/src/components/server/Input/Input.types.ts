export interface IInput {
  inputType: 'text' | 'password'
  placeholder: string
  inputName: string
  label: string
  variant: 'default' | 'error'
  defaultValue: number
  value: string
  auxClassNames: string
  handleChange: (...args: any[]) => any
}
