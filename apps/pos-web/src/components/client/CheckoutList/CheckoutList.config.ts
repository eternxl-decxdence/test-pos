import createConfig from "@utils/ConfigFactory";

const config = createConfig({
  elements: {
    'main-container': {
      styles: {
        layout: 'flex w-full h-full flex-col justify-between gap-2 px-2 py-1 ',
        sizing: 'bg-sky-200 border-sky-500 inset-shadow-product inset-shadow-slate-400 ',
        colors: 'border-1 rounded md',
      }
    },
    'list-container': {
      styles: {
        layout: 'flex flex-col gap-1 overflow-y-auto h-[460px]',
        colors: 'divide-slate-500',
        sizing: 'divide-y-1'
      }
    },
    'summary-container': {
      styles: {
        layout: 'flex flex-col gap-0'
      }
    },
    'summary-entry': {
      styles: {
        layout: 'flex flex-row items-center justify-end gap-2 pr-2 w-full',
        colors: 'border-slate-800',
        sizing: 'border-t-1'
      }
    },
    'summary-text': {
      styles: {
        layout: 'py-2 leading-none text-right',
        colors: 'font-medium font-roboto text-slate-800',
        sizing: 'text-xs'
      }
    },
    'summary-divider': {
      styles: {
        layout: 'w-px h-4',
        colors: 'bg-slate-800',
        sizing: 'border-0'
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
        layout: 'w-6/9 truncate',
        colors: 'font-roboto font-medium text-slate-800',
        sizing: 'text-xs'
      }
    },
    'product-qty': {
      styles: {
        layout: "w-1/9 text-right",
        colors: 'font-roboto font-medium text-slate-800',
        sizing: 'text-xs'
      }
    },
    'product-price': {
      styles: {
        layout: "w-2/9 text-right ",
        colors: 'font-roboto font-medium text-slate-800',
        sizing: 'text-xs'
      }
    },
  }
})
export default config