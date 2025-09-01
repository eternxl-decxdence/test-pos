'use client'
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { modalStore } from '@store/ModalStore'
import { AnimatePresence } from 'motion/react'

export const ModalProvider = observer(() => {
  const [mounted, setMounted] = useState(false)
  const [element, setElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setMounted(true)
    setElement(document.getElementById('portal-root'))
  }, [])

  if (!(mounted && element)) return null

  const renderContent = (content: any) => {
    // JSX уже
    if (React.isValidElement(content)) return content

    // React-компонент (observer работает)
    if (typeof content === 'function') {
      const C = content as React.ComponentType<any>
      try {
        return <C />
      } catch {
        return <div className="p-4 text-red-600">Modal render error</div>
      }
    }

    // fallback: string/number
    if (typeof content === 'string' || typeof content === 'number') return <div>{content}</div>

    return <div className="p-4 text-red-600">Invalid modal content</div>
  }

  return createPortal(
    <>
      {modalStore.modals.map((m) => (
        <div
          key={m.id}
          className="fixed inset-0 flex items-center justify-center bg-slate-800/50 z-50"
          onClick={() => modalStore.hide(m.id)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <AnimatePresence>{renderContent(m.content)}</AnimatePresence>
          </div>
        </div>
      ))}
    </>,
    element,
  )
})
