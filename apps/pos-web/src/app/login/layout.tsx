import { ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-6 bg-linear-to-b from-sky-200 to-sky-100">
      {children}
    </div>
  )
}
