'use client'

import IcuHeaderDatePicker from '@/components/hospital/icu/header/date-picker/header-date-picker'
import { Button } from '@/components/ui/button'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { useRealtimeSubscriptionStore } from '@/lib/store/icu/realtime-subscription'
import { changeTargetDateInUrl } from '@/lib/utils/utils'
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons'
import { addDays, format, isToday } from 'date-fns'
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation'
import { useCallback, useState } from 'react'

export default function HeaderDateSelector() {
  const searchParams = useSearchParams()
  const params = useParams()
  const pathname = usePathname()
  const router = useRouter()
  const { setSelectedOrderPendingQueue } = useIcuOrderStore()
  const { setIsSubscriptionReady } = useRealtimeSubscriptionStore()

  const [targetDate, setTargetDate] = useState(
    new Date(params.target_date as string),
  )

  const updateDate = useCallback(
    (newDate: Date) => {
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
    },
    [
      pathname,
      router,
      searchParams,
      setSelectedOrderPendingQueue,
      setIsSubscriptionReady,
    ],
  )

  const handleUpdateDate = useCallback(
    (days: number) => {
      updateDate(addDays(targetDate, days))
    },
    [targetDate, updateDate],
  )

  const handleMoveToToday = useCallback(() => {
    updateDate(new Date())
  }, [updateDate])

  return (
    <div className="flex h-8 items-center gap-3">
      <Button
        onClick={() => handleUpdateDate(-1)}
        size="icon"
        variant="outline"
        className="h-6 w-6 rounded-full"
        aria-label="이전 날짜로 이동"
      >
        <ArrowLeftIcon />
      </Button>

      <div className="flex items-center gap-1">
        <span className="min-w-20">{format(targetDate, 'yyyy-MM-dd')}</span>
        <IcuHeaderDatePicker
          targetDate={format(targetDate, 'yyyy-MM-dd')}
          setIsSubscriptionReady={setIsSubscriptionReady}
        />
      </div>

      <Button
        onClick={() => handleUpdateDate(1)}
        size="icon"
        variant="outline"
        className="h-6 w-6 rounded-full"
        aria-label="다음 날짜로 이동"
      >
        <ArrowRightIcon />
      </Button>
      {!isToday(targetDate) && (
        <Button
          onClick={handleMoveToToday}
          type="button"
          size="sm"
          variant="outline"
          className="px-2"
          aria-label="오늘 날짜로 이동"
        >
          오늘로
        </Button>
      )}
    </div>
  )
}
