import createConfig from 'utils/ConfigFactory'
const config = createConfig({
  elements: {
    text: {
      styles: {
        layout: 'flex flex-row gap-2',
        animation: 'transition-color duration-100',
        colors: 'font-poppins text-slate-800',
        sizing: 'text-xs leading-none',
      },
    },
    separator: {
      styles: {
        layout: 'w-px h-full',
        colors: 'font-poppins bg-slate-800',
      },
    },
  },
  logic: {
    getDayVerbose: (day: number): string => {
      return day - 1 <= 6
        ? ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'][day - 1]
        : 'null'
    },
    getMonthVerbose: (month: number): string => {

      return month - 1 <= 11
        ? [
          'Styczeń',
          'Luty',
          'Marzec',
          'Kwiecień',
          'Maj',
          'Czerwiec',
          'Lipiec',
          'Sierpień',
          'Wrzesień',
          'Październik',
          'Listopad',
          'Grudzień',
        ][month]
        : 'null'
    },
  },
})
export default config
