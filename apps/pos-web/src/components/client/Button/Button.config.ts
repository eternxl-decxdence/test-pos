import clsx from 'clsx'
import createConfig from 'utils/ConfigFactory'
import { easeIn, easeOut } from 'motion/react'
export const config = createConfig({
  elements: {
    button: {
      styles: {
        layout: 'font-poppins flex z-10  flex-row items-center justify-center gap-2  ',
        animation: 'transition-color duration-100',
        colors: 'font-medium bg-sky-500 text-sky-50 hover:bg-sky-300',
        sizing: 'text-sm 2xl:text-base rounded-md w-full',
      },
    },
    'outline-div': {
      styles: {
        layout: 'flex relative flex-col w-full items-end justify-center',
        animation: 'transition-all duration-100',
        colors: 'bg-sky-300',
        sizing: 'pb-0.5 hover:pb-0 hover:mt-0.5 rounded-md',
      },
    },
    'ripple-effect': {
      styles: {
        layout: 'absolute w-full h-full inset-0 z-0 pointer-events-none',
        colors: 'bg-slate-500',
        sizing: 'rounded-md',
      },
      animations: {
        variants: {
          initial: { scale: 1, opacity: 1 },
          animate: {
            scaleX: 1.3,
            scaleY: 1.6,
            opacity: 0,
            transition: {
              scaleX: { duration: 0.4, ease: easeIn },
              scaleY: { duration: 0.4, ease: easeIn },
              opacity: { duration: 0.6, ease: easeOut },
            },
          },
          exit: { opacity: 0 },
        },
      },
    },
  },
})
