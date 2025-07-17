'use client'

import { useEffect, useState } from 'react'

export default function GeneralClock() {
  const [time, setTime] = useState<string>('') // 초기값 제거

  useEffect(() => {
    const update = () => setTime(getCurrentTime())
    update() // mount 시 최초 1회 설정

    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="ml-3 w-[200px] text-lg">
      {time ? `현재시간 : ${time}` : '(시간 불러오는 중...)'}
    </div>
  )
}

function getCurrentTime(): string {
  const now = new Date()
  return now.toLocaleTimeString('ko-KR', { hour12: false }) // 24시간 형식
}
