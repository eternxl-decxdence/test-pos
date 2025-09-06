import createConfig from "@utils/ConfigFactory";

const config = createConfig({
  elements: {
    'inside-container': {
      styles: {
        layout: 'flex flex-col gap-2 justify-end',
        sizing: 'w-full h-full'
      }
    },
    'shift-timer': {
      styles: {
        layout: 'flex flex-row justify-between',
        colors: 'font-poppins text-slate-800',
        sizing: 'text-xs'
      }
    },
    'button-container': {
      styles: {
        layout: "w-full flex justify-center items-center"
      }
    }
  }
})

export default config