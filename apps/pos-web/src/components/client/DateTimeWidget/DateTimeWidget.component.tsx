'use client'
import { useEffect, useState } from 'react'
import { setInterval, clearInterval } from 'timers'
import config from './DateTimeWidget.config'

export default function DateTimeWidget() {
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return (
    <div className={config.logic.composeStyles('text')}>
      {`${config.logic.getDayVerbose(
        time.getDay(),
      )}, ${time.getDate()} ${config.logic.getMonthVerbose(time.getMonth())} ${time.getFullYear()}`}
      <div className={config.logic.composeStyles('separator')}></div>
      <span>
        {`${time.getHours()}`}
        <span className="animate-pulse"> : </span>
        {`${time.getMinutes() > 10 ? '' : '0'}${time.getMinutes()}`}
      </span>
    </div>
  )
}
