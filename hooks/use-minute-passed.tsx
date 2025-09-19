import { useEffect, useState } from 'react'

export default function useMinutesPassed(startTime: string | null) {
  if (!startTime) return 0

  const [minutesPassed, setMinutesPassed] = useState<number>(0)

  useEffect(() => {
    function updateMinutes() {
      const start = new Date(startTime!).getTime()
      const now = new Date().getTime() // 현재 로컬 시간 (한국이면 한국 기준)
      const diffMinutes = Math.floor((now - start) / 1000 / 60)
      setMinutesPassed(diffMinutes)
    }

    updateMinutes() // 처음 실행 시 바로 계산
    const interval = setInterval(updateMinutes, 60_000) // 1분마다 업데이트

    return () => clearInterval(interval)
  }, [startTime])

  return minutesPassed
}
