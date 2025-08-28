import createConfig from '@utils/ConfigFactory'

const config = createConfig({
  elements: {
    input: {
      styles: {
        layout: 'p-2',
        colors: 'outline-slate-500 bg-slate-200 focus:outline-sky-500',
        animation: 'transition-all duration-100',
        sizing: 'w-full outline-1 rounded-md focus:outline-2 hover:outline-2',
      },
    },
    box: {
      styles: {
        layout: 'flex flex-col gap-1 pb-2',
        colors: 'font-poppins text-slate-800',
        sizing: 'text-xs w-full',
      },
    },
    'input-error': {
      styles: {
        layout: 'p-2',
        colors: 'outline-rose-700 bg-rose-50 focus:outline-rose-500',
        animation: 'transition-all duration-100',
        sizing: 'w-full outline-1 rounded-md focus:outline-2 hover:outline-2',
      },
    },
  },
})

export default config
