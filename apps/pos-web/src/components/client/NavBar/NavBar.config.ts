import createConfig from '@utils/ConfigFactory'

const config = createConfig({
  elements: {
    container: {
      styles: {
        layout: 'relative flex flex-col gap-2 w-full',
      },
    },
    'nav-button': {
      styles: {
        layout: 'relative flex flex-row gap-2 items-center justify-start px-2 py-1.5 ',
      },
    },
    'nav-label': {
      styles: {
        colors: 'font-poppins text-slate-800',
        sizing: 'leading-none text-xs',
      },
    },
    'nav-icon': {
      styles: {
        colors: 'text-sky-500',
        sizing: 'text-sm',
      },
    },
    'nav-icon-active': {
      styles: {
        layout: 'z-20',
        colors: 'text-sky-50',
        sizing: 'text-sm',
      },
    },
    'nav-label-active': {
      styles: {
        layout: 'z-20',
        colors: 'font-poppins text-sky-50',
        sizing: 'leading-none font-medium text-xs',
        animation: 'transition-100 ease-in-out',
      },
    },
    'animated-background': {
      styles: {
        layout: 'absolute z-0',
        sizing: 'inset-0 rounded-lg',
        colors: 'bg-sky-500',
      },
    },
  },
})

export default config
