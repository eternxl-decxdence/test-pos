'use client'

import clsx from 'clsx'
import { motion, AnimatePresence } from 'motion/react'
import { type IButton } from './Button.types'
import { config } from './Button.config'
import { useState } from 'react'

export default function Button({
  action,
  label,
  icon,
  auxClassNames,
  disabled,
  submit,
}: Partial<IButton>) {
  const [ripple, setRipple] = useState(false)
  function onClickAnimation() {
    if (!ripple) {
      setRipple(true)
      action?.()
    }
  }
  return (
    <div className={config.logic.composeStyles('outline-div')}>
      <AnimatePresence>
        {ripple && (
          <motion.span
            variants={config.elements['ripple-effect'].animations!.variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={config.logic.composeStyles('ripple-effect')}
            onAnimationComplete={() => {
              setRipple(false)
            }}
          />
        )}
      </AnimatePresence>
      <button
        type={submit ? 'submit' : 'button'}
        onClick={(e) => {
          onClickAnimation()
        }}
        disabled={disabled}
        className={clsx(auxClassNames, config.logic.composeStyles('button'))}
      >
        {icon}
        {label}
      </button>
    </div>
  )
}
