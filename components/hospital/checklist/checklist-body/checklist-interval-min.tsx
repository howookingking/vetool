'use client'

import { timeInterval } from '@/constants/checklist/checklist'
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'

type Props = {
  startime: string | null
  setChecklistTimes: (intervaltime: string) => void
}
export default function ChecklistIntervalMin({
  startime,
  setChecklistTimes,
}: Props) {
  const [time, setTime] = useState<String | null>(null)
  const [intermin, setInterMin] = useState<String>('0')

  useEffect(() => {
    const interval = setInterval(() => {
      //   setTime(getCurrentTime())
      if (startime) {
        if (intermin) {
          if (
            intermin !== timeInterval(startime, new Date().toISOString())[0]
          ) {
            setInterMin(timeInterval(startime, new Date().toISOString())[0])
            setChecklistTimes(
              String(timeInterval(startime, new Date().toISOString())[0]),
            )
          }
        }
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [startime])

  return <div className="ml-3 text-lg font-bold">{intermin}분</div>
}
