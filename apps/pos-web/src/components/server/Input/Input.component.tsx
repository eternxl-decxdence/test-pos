import { type IInput } from './Input.types'
import config from './Input.config'

export default function Input({
  variant = 'default',
  inputType = 'text',
  defaultValue,
  value,
  placeholder,
  inputName,
  label,
  handleChange,
}: Partial<IInput>) {
  return (
    <div className={config.logic.composeStyles('box')}>
      <label htmlFor={inputName}>{label}</label>
      <input
        defaultValue={defaultValue}
        value={value}
        onChange={handleChange}
        autoComplete={inputName}
        type={inputType}
        name={inputName}
        id={inputName}
        placeholder={placeholder}
        className={config.logic.composeStyles(`input${variant === 'error' ? '-error' : ''}`)}
      />
    </div>
  )
}
