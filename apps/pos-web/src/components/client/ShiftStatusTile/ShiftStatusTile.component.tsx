'use client'
import DashboardWidget from '@components/server/DashboardWidget/DashboardWidget.component'
import Button from '../Button/Button.component'
import { useShift } from '@utils/hooks/useShift'
import { shiftStore } from '@store/ShiftStore'
import { modalStore } from '@store/ModalStore'
import { observer } from 'mobx-react'
import { useEffect, useState, FormEvent } from 'react'
import CashInputModal from '../CashInputModal/CashInputModal.component'
import ShiftTimer from '../ShiftTimer/ShiftTimer.component'

const ShiftStatusTile = observer(() => {
  const { start, end, get } = useShift()
  useEffect(() => {}, [])
  useEffect(() => {
    const todayDate = new Date()
    const yesterdayDate = new Date(todayDate.setDate(todayDate.getDate() - 1))
    get.mutate(
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
      end.mutate({ shiftId: shiftStore.shiftId!, cashEnd: cash })
      shiftStore.endShift()
    } else {
      modalStore.hide('cash')
      start.mutate(
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
      <div className="flex w-full h-full flex-col gap-2 justify-end">
        <span className="font flex flex-row justify-between font-poppins text-xs text-slate-800">
          Stan kasy: {shiftStore.cash ? shiftStore.cash : 'N/A'}
          <ShiftTimer />
        </span>
        <Button
          action={handleClick}
          label={!shiftStore.isStarted ? 'Rozpocznij zmianę' : 'Zakończ zmianę'}
          auxClassNames="w-full h-12"
        />
      </div>
    </DashboardWidget>
  )
})

export default ShiftStatusTile
