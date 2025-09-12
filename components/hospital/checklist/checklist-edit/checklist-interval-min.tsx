'use client'

import { timeInterval } from '@/constants/checklist/checklist'
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'

type Props = {
  setedintervalmin: Number
  startime: string | null
  setChecklistTimes: (intervaltime: string) => void | null
}
export default function ChecklistIntervalMin({
  setedintervalmin,
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
            // const min1 = Number(setedintervalmin)
            // const min2 = Number(
            //   timeInterval(startime, new Date().toISOString())[0],
            // )
            // setTime(String(min2))
            // const isSame = min2 % min1
            // if (min1 !== 0 && min2 >= min1 && isSame === 0) {
            //   setChecklistTimes(String(min2))
            // }
          }
        }
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [startime, intermin, setChecklistTimes])

  return <div className="text-xl">{intermin}분</div>
}

function getCurrentTime(): string {
  const now = new Date()
  return now.toLocaleTimeString('ko-KR', { hour12: false }) // 24시간 형식
}
