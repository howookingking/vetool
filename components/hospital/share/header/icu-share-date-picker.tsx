'use client'

import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { useRouter, useSearchParams } from 'next/navigation'
import { addDays } from 'date-fns'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { ko } from 'date-fns/locale'
import { useState } from 'react'

export default function IcuShareHeader({ targetDate }: { targetDate: string }) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()

  const handleUpdateDate = (days: number) => {
    const newDate = addDays(new Date(targetDate), days)
    const params = new URLSearchParams(searchParams.toString())
    params.set('target-date', format(newDate, 'yyyy-MM-dd'))

    router.push(`?${params.toString()}`)
  }

  const handleSelectDate = (date: Date | undefined) => {
    if (!date) return

    const params = new URLSearchParams(searchParams.toString())
    params.set('target-date', format(date, 'yyyy-MM-dd'))

    router.push(`?${params.toString()}`)
    setIsCalendarOpen(false)
  }

  return (
    <div
      className="mx-auto inline-flex items-center justify-center gap-1 2xl:mx-0 2xl:w-fit 2xl:justify-start"
      data-guide="date-picker"
    >
      <Button
        onClick={() => handleUpdateDate(-1)}
        size="icon"
        variant="outline"
        className="h-6 w-6 rounded-full"
        aria-label="이전 날짜로 이동"
      >
        <ArrowLeftIcon />
      </Button>

      <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
        <PopoverTrigger asChild>
          <Button
            className="h-8 px-2 py-0 text-base font-semibold"
            variant="ghost"
          >
            {format(targetDate, 'yyyy-MM-dd')}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            className="text-sm"
            styles={{
              button: { fontSize: 12 },
            }}
            captionLayout="dropdown-buttons"
            showOutsideDays
            fixedWeeks
            locale={ko}
            mode="single"
            initialFocus
            selected={new Date(targetDate)}
            onSelect={(date) => handleSelectDate(date)}
          />
        </PopoverContent>
      </Popover>

      <Button
        onClick={() => handleUpdateDate(1)}
        size="icon"
        variant="outline"
        className="h-6 w-6 rounded-full"
        aria-label="다음 날짜로 이동"
      >
        <ArrowRightIcon />
      </Button>
    </div>
  )
}
