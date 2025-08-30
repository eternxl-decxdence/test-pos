'use client'
import DashboardWidget from '@components/server/DashboardWidget/DashboardWidget.component'
import Button from '../Button/Button.component'
export default function ShiftStatusTile() {
  return (
    <DashboardWidget title="Zmiana" auxClassNames="col-span-1">
      <div className="flex w-full h-full flex-col justify-end">
        <span className="">
          Stan kasy:{' '}
          {/*STUB | TODO:  Dane o stanie kasy z zeszłej zmiany lub N/A (edge case: brak przeszłej zmiany)*/}
        </span>
        <Button label="Rozpocznij zmianę" auxClassNames="w-full h-12" />
      </div>
    </DashboardWidget>
  )
}
