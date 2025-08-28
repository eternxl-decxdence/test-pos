import createConfig from 'utils/ConfigFactory'

const config = createConfig({
  elements: {
    'date-time-widget': {
      styles: {
        layout: 'flex flex-row gap-2 px-4 py-2',
        colors: 'border-sky-400 bg-sky-50 shadow-xl',
        sizing: 'rounded-md border-1',
      },
    },
  },
})

export default config
