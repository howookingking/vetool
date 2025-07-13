import { useEffect, useState } from 'react'

export const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000 * 60)

    return () => clearInterval(interval)
  }, [])

  return {
    hours: currentTime.getHours(),
    minutes: currentTime.getMinutes(),
  }
}
