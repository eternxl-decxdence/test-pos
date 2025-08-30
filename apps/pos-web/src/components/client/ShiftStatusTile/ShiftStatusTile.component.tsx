'use client'
import DashboardWidget from '@components/server/DashboardWidget/DashboardWidget.component'
import Button from '../Button/Button.component'
import { useShift } from '@utils/useShift'
export default function ShiftStatusTile() {
  const { start, end } = useShift()

  return (
    <DashboardWidget title="Zmiana" auxClassNames="col-span-1">
      <div className="flex w-full h-full flex-col justify-end">
        <span className="">Stan kasy:</span>
        <Button label="Rozpocznij zmianę" auxClassNames="w-full h-12" />
      </div>
    </DashboardWidget>
  )
}
