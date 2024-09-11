'use client'

import IcuHeaderDatePicker from '@/components/hospital/icu/header/date-picker/header-date-picker'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { useParams, useRouter, useSearchParams } from 'next/navigation'

export default function HeaderDateSelector() {
  const searchParams = useSearchParams()
  const { target_date, hos_id } = useParams()
  const { push } = useRouter()

  const handleUpdateDate = (days: number) => {
    const newDate = new Date(target_date as string)
    newDate.setDate(newDate.getDate() + days)

    const newDateString = format(newDate, 'yyyy-MM-dd')
    const params = new URLSearchParams(searchParams)
    const newPath = `/hospital/${hos_id}/icu/${newDateString}?${params.toString()}`

    push(newPath)
  }

  const handleMoveToToday = () => {
    const newDate = new Date()
    const newDateString = format(newDate, 'yyyy-MM-dd')
    const params = new URLSearchParams(searchParams)
    const newPath = `/hospital/${hos_id}/icu/${newDateString}?${params.toString()}`

    push(newPath)
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={() => handleUpdateDate(-1)}
        size="icon"
        variant="outline"
        className="h-6 w-6 rounded-full"
      >
        <ArrowLeftIcon />
      </Button>
      <div className="flex items-center gap-1">
        <span className="min-w-20 text-sm">{target_date}</span>
        <IcuHeaderDatePicker targetDate={target_date as string} />
      </div>
      <Button
        onClick={() => handleUpdateDate(1)}
        size="icon"
        variant="outline"
        className="h-6 w-6 rounded-full"
      >
        <ArrowRightIcon />
      </Button>
      <Button
        onClick={handleMoveToToday}
        type="button"
        size="sm"
        variant="outline"
      >
        오늘 날짜로 이동
      </Button>
    </div>
  )
}
