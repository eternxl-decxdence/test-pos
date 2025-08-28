export interface IInput {
  inputType: 'text' | 'password'
  placeholder: string
  inputName: string
  label: string
  variant: 'default' | 'error'

  handleChange: (...args: any[]) => any
}
