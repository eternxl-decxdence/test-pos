import createConfig from '@utils/ConfigFactory'

const config = createConfig({
  elements: {
    title: {
      styles: {
        sizing: 'text-xs leading none',
        colors: 'text-slate-500 font-poppins',
      },
    },
    separator: {
      styles: {
        layout: 'w-full h-px',
        colors: 'bg-slate-500',
        sizing: 'rounded-full',
      },
    },
    container: {
      styles: {
        layout: 'flex flex-col gap-1 p-2 outline-1',
        colors: 'outline-sky-500 bg-sky-50 shadow-xl',
        sizing: 'outline-1 rounded-md',
      },
    },
  },
})

export default config
