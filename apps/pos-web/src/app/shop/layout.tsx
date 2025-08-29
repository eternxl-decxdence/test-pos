import DateTimeWidget from '@components/client/DateTimeWidget/DateTimeWidget.component'
import { ReactComponent as Logo } from '@assets/cool-pos-logo.svg'
import { ReactNode } from 'react'
import NavBar from '@components/client/NavBar/NavBar.component'
export default function ShopLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-screen h-screen flex-col bg-sky-200">
      <div className="flex flex-row h-full">
        <div className="flex p-2 flex-col gap-2 w-[200px] bg-white h-full shadow-2xl">
          <div className="flex flex-row gap-2 w-full items-center justify-start">
            <Logo className="flex items-center aspect-square justify-center rounded-md bg-slate-200 text-sky-500 shadow-2xl" />
            <p className="font-poppins font-semibold text-xs text-sky-800 w-fit">
              Twój niezawodny <br /> asystent POS
            </p>
          </div>
          <div className="w-full h-px bg-slate-400 rounded-full" />
          <NavBar />
        </div>
        <main>{children}</main>
      </div>
      <div className="flex p-2 flex-row justify-end bg-white shadow-2xl">
        <DateTimeWidget />
      </div>
    </div>
  )
}
