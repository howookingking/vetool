'use client'

import { useEffect, useState } from 'react'

export default function GeneralClock() {
  const [time, setTime] = useState<string>(getCurrentTime())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentTime())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return <div className="ml-3 text-lg font-bold">(현재시간 : {time})</div>
}

function getCurrentTime(): string {
  const now = new Date()
  return now.toLocaleTimeString('ko-KR', { hour12: false }) // 24시간 형식
}
