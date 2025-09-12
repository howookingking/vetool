'use client'
import { useEffect, useState } from 'react'

export default function LocalTime({ time }: { time: number | string }) {
  const [localTime, setLocalTime] = useState<string>('')

  useEffect(() => {
    if (time) {
      const date = new Date(time)
      setLocalTime(date.toLocaleTimeString())
    }
  }, [time])

  return <>{localTime}</>
}
