import createConfig from "@utils/ConfigFactory";

const config = createConfig({
  elements: {
    'page-label': {
      styles: {
        layout: 'px-3 py-1',
        colors: 'text-sky-500 font-semibold font-poppins',
        sizing: 'text-xs'
      }
    },
    'product-list': {
      styles: {
        colors: 'inset-shadow-sky-50 inset-shadow-product bg-sky-100 divide-solid divide-slate-600',
        layout: 'flex flex-col justify-start items-center p-1 w-full h-100 flex flex-col justify-start items-center w-full gap-0',
        sizing: 'rounded-md divide-y-1 '
      }
    }
  }
})
export default config