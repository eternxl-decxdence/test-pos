import createConfig from 'utils/ConfigFactory'

const config = createConfig({
  elements: {
    'login-form': {
      styles: {
        layout: 'flex flex-col h-fit items-center justify-end gap-4 p-4',
        colors: 'shadow-xl border-sky-400 bg-sky-50 ',
        sizing: 'rounded-md border-1 w-3xs ',
      },
    },
    logo: {
      styles: {
        layout: 'w-16 h-16',
        colors: 'bg-slate-200 text-sky-500 shadow-2xl',
        sizing: 'rounded-md',
      },
    },
    'error-message': {
      styles: {
        layout: 'w-full text-center',
        colors: 'text-rose-500 font-poppins text-xs',
      },
    },
  },
})

export default config
