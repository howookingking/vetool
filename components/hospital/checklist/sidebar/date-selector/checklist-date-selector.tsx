'use client'

import IcuDatePicker from '@/components/hospital/icu/sidebar/date-selector/icu-date-picker'
import { Button } from '@/components/ui/button'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
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

export default function ChecklistDateSelector() {
  const searchParams = useSearchParams()
  const params = useParams()
  const pathname = usePathname()
  const router = useRouter()
  const { setSelectedOrderPendingQueue } = useIcuOrderStore()

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

      <IcuDatePicker targetDate={format(targetDate, 'yyyy-MM-dd')} />

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
