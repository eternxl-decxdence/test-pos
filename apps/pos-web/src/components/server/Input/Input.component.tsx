import { type IInput } from './Input.types'
import config from './Input.config'
import clsx from 'clsx'
import { forwardRef } from 'react'

const Input = forwardRef<HTMLInputElement, Partial<IInput>>(
  (
    {
      variant = 'default',
      inputType = 'text',
      defaultValue,
      value,
      placeholder,
      inputName,
      label,
      handleChange,
      auxClassNames,
    },
    ref,
  ) => {
    return (
      <div className={config.logic.composeStyles('box')}>
        <label htmlFor={inputName}>{label}</label>
        <input
          ref={ref}
          defaultValue={defaultValue}
          value={value}
          onChange={handleChange}
          autoComplete={inputName}
          type={inputType}
          name={inputName}
          id={inputName}
          placeholder={placeholder}
          className={clsx(
            auxClassNames,
            config.logic.composeStyles(`input${variant === 'error' ? '-error' : ''}`),
          )}
        />
      </div>
    )
  },
)
export default Input
