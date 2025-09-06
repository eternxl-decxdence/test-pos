import createConfig from '@utils/ConfigFactory'

const config = createConfig({
  elements: {
    'main-container': {
      styles: {
        layout: 'w-full h-16 flex flex-row items-center justify-start gap-2 px-2',
        colors: 'border-slate-800',
        sizing: 'last:border-b-1'
      }
    },
    'image-container': {
      styles: {
        layout: 'w-12 h-12 p-1 flex justify-center items-center'
      }
    },
    'image-styles': {
      styles: {
        layout: "max-h-full max-w-12 object-contain"
      }
    },
    'text': {
      styles: {
        layout: 'w-48',
        colors: 'font-poppins text-slate-800',
        sizing: 'text-xs'
      }
    }
  },
})
export default config
