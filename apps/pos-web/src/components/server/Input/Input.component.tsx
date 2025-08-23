import { type IInput } from './Input.types'
import config from './Input.config'

export default function Input({ inputType = 'text', placeholder, inputName, label }: IInput) {
  return (
    <div className={config.logic.composeStyles('box')}>
      <label htmlFor={inputName}>{label}</label>
      <input
        autoComplete={inputName}
        type={inputType}
        name={inputName}
        id={inputName}
        placeholder={placeholder}
        className={config.logic.composeStyles('input')}
      />
    </div>
  )
}
