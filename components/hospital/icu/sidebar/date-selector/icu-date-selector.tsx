'use client'

import { Button } from '@/components/ui/button'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { useRealtimeSubscriptionStore } from '@/lib/store/icu/realtime-subscription'
import { changeTargetDateInUrl } from '@/lib/utils/utils'
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons'
import { addDays, format } from 'date-fns'
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation'
import { useState } from 'react'
import IcuDatePicker from './icu-date-picker'

export default function IcuDateSelector() {
  const searchParams = useSearchParams()
  const params = useParams()
  const pathname = usePathname()
  const router = useRouter()
  const { setSelectedOrderPendingQueue } = useIcuOrderStore()
  const { setIsSubscriptionReady } = useRealtimeSubscriptionStore()

  const [targetDate, setTargetDate] = useState(
    new Date(params.target_date as string),
  )

  const updateDate = (newDate: Date) => {
    const newDateString = format(newDate, 'yyyy-MM-dd')
    const newPath = changeTargetDateInUrl(
      pathname,
      newDateString,
      new URLSearchParams(searchParams),
    )
    router.push(newPath)
    setTargetDate(newDate)
    setSelectedOrderPendingQueue([])
    setIsSubscriptionReady(false)
  }

  const handleUpdateDate = (days: number) => {
    updateDate(addDays(targetDate, days))
  }

  // const handleMoveToToday = useCallback(() => {
  //   updateDate(new Date())
  // }, [updateDate])

  return (
    <div className="flex items-center justify-center gap-1">
      <Button
        onClick={() => handleUpdateDate(-1)}
        size="icon"
        variant="outline"
        className="h-6 w-6 rounded-full"
        aria-label="이전 날짜로 이동"
      >
        <ArrowLeftIcon />
      </Button>

      <IcuDatePicker
        targetDate={format(targetDate, 'yyyy-MM-dd')}
        setIsSubscriptionReady={setIsSubscriptionReady}
      />

      <Button
        onClick={() => handleUpdateDate(1)}
        size="icon"
        variant="outline"
        className="h-6 w-6 rounded-full"
        aria-label="다음 날짜로 이동"
      >
        <ArrowRightIcon />
      </Button>

      {/* <div className="flex w-full">
        <Button
          onClick={handleMoveToToday}
          type="button"
          variant="outline"
          className={`w-full ${isToday(targetDate) ? 'invisible' : 'visible'}`}
          aria-label="오늘 날짜로 이동"
        >
          오늘로
        </Button>
      </div> */}
    </div>
  )
}
