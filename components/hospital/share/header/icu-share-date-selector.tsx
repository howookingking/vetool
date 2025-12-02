'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { addDays, format, subDays } from 'date-fns'
import { ko } from 'date-fns/locale'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

type IcuShareDateSelectorProps = {
  targetDate: string
  inDate: string
}

export default function IcuShareDateSelector({
  targetDate,
  inDate,
}: IcuShareDateSelectorProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const handleUpdateDate = (days: number) => {
    const newDate = addDays(new Date(targetDate), days)
    const params = new URLSearchParams(searchParams.toString())
    params.set('targetDate', format(newDate, 'yyyy-MM-dd'))
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
    <div data-guide="date-picker" className="flex items-center gap-1">
      <Button
        onClick={() => handleUpdateDate(-1)}
        size="icon"
        variant="outline"
        className="h-6 w-6 rounded-full"
        aria-label="이전 날짜로 이동"
        disabled={targetDate === inDate}
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
            disabled={(date) => date < new Date(subDays(inDate, 1))}
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
