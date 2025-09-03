import createConfig from "@utils/ConfigFactory";

const config = createConfig({
  elements: {
    'grid-child-container': {
      styles: {
        layout: "col-span-3 pl-4 col-start-6 row-span-12 row-start-1"
      }
    },
    'main-container': {
      styles: {
        layout: 'p-4 flex flex-col gap-4',
        sizing: "w-full h-full outline-1",
        colors: 'bg-white outline-sky-500 shadow-2xl'
      }
    },
    'label': {
      styles: {
        colors: 'font-semibold text-sky-500 ',
        sizing: 'text-base font-poppins leading-none'
      }
    },
    'cart-container': {
      styles: {
        layout: "w-full h-[480px] flex flex-col overflow-y-scroll p-4",
        colors: "shadow-inset-sm divide-slate-600 bg-sky-100 outline-sky-500 inset-shadow-slate-950",
        sizing: "divide-y-1 rounded-md outline-1",
      }
    },
    'product-entry': {
      styles: {
        layout: 'flex flex-row py-2 gap-2 justify-between items-center',
        sizing: "w-full"
      }
    },
    'product-name': {
      styles: {
        layout: 'w-34 truncate',
        colors: 'font-roboto font-medium text-slate-800',
        sizing: 'text-xs'
      }
    },
    'product-qty': {
      styles: {
        layout: "w-10 ",
        colors: 'font-roboto font-medium text-slate-800',
        sizing: 'text-xs'
      }
    },
    'product-price': {
      styles: {
        layout: "w-20 text-right ",
        colors: 'font-roboto font-medium text-slate-800',
        sizing: 'text-xs'
      }
    },
    'product-remove-button': {
      styles: {
        layout: 'h-4 flex items-center justify-center',
        colors: 'text-rose-600'
      }
    }
  }
})

export default config