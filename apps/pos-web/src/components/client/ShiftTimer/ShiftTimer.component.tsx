import { useEffect, useState } from 'react'
import { shiftStore } from '@store/ShiftStore'
import { observer } from 'mobx-react'

const ShiftTimer = observer(() => {
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    if (!shiftStore.isStarted) return

    const interval = setInterval(() => {
      if (!shiftStore.startDate || !shiftStore.isStarted) return
      const now = new Date().getTime()

      const start = new Date(shiftStore.startDate).getTime()
      setDuration(Math.floor((now - start) / 1000))
    }, 1000)

    return () => clearInterval(interval)
  }, [shiftStore.startDate])

  const hours = Math.floor(duration / 3600)
  const minutes = Math.floor((duration % 3600) / 60)
  const seconds = duration % 60

  return (
    <div>
      {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:
      {seconds.toString().padStart(2, '0')}
    </div>
  )
})

export default ShiftTimer
