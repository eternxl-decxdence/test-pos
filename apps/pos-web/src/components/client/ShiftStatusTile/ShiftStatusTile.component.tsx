'use client'
import DashboardWidget from '@components/server/DashboardWidget/DashboardWidget.component'
import Button from '../Button/Button.component'
import { useShift } from '@utils/hooks/useShift'
import { shiftStore } from '@store/ShiftStore'
import { modalStore } from '@store/ModalStore'
import { observer } from 'mobx-react'
import { useEffect, FormEvent } from 'react'
import CashInputModal from '../CashInputModal/CashInputModal.component'
import ShiftTimer from '../ShiftTimer/ShiftTimer.component'
import config from './ShiftStatusTile.config'

const ShiftStatusTile = observer(() => {
  const shift = useShift()
  useEffect(() => {}, [])
  useEffect(() => {
    const todayDate = new Date()
    const yesterdayDate = new Date(todayDate.setDate(todayDate.getDate() - 1))
    shift.get.mutate(
      { date: yesterdayDate.toJSON().split('T')[0] },
      {
        onSuccess: (data) => {
          if (!shiftStore.cash) shiftStore.setCash(data.cashStart)
        },
      },
    )
  }, [])

  function handleClick() {
    if (!modalStore.modals.some((m) => m.id === 'cash')) {
      modalStore.show(() => <CashInputModal handleSubmit={submitCashAmount} />, 'cash')
    }
  }
  function submitCashAmount(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const cash = parseFloat(
      (e.currentTarget.elements.namedItem('cashAmount')! as HTMLInputElement).value,
    )
    shiftStore.setCash(cash)
    if (shiftStore.isStarted) {
      modalStore.hide('cash')
      shift.end.mutate({ shiftId: shiftStore.shiftId!, cashEnd: cash })
      shiftStore.endShift()
    } else {
      modalStore.hide('cash')
      shift.start.mutate(
        { cashStart: shiftStore.cash! },
        {
          onSuccess: (data) => {
            shiftStore.startShift(data.shift)
          },
        },
      )
    }
  }
  return (
    <DashboardWidget title="Zmiana">
      <div className={config.logic.composeStyles('inside-container')}>
        <span className={config.logic.composeStyles('shift-timer')}>
          Stan kasy: {shiftStore.cash ? shiftStore.cash : 'N/A'}
          <ShiftTimer />
        </span>
        <div className={config.logic.composeStyles('button-container')}>
          <Button
            action={handleClick}
            label={!shiftStore.isStarted ? 'Rozpocznij zmianę' : 'Zakończ zmianę'}
            auxClassNames="px-20 py-2"
          />
        </div>
      </div>
    </DashboardWidget>
  )
})

export default ShiftStatusTile
