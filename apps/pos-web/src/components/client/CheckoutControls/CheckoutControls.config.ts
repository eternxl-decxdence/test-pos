import createConfig from "@utils/ConfigFactory"
const config = createConfig({
  elements: {
    'main-container': {
      styles: {
        layout: 'flex w-full h-full flex-col justify-between gap-2 px-2 ',
      }
    },
  }
})
export default config