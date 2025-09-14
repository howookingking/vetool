'use client'

import { Button } from '@/components/ui/button'
import { addDays, format } from 'date-fns'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import ChecklistDatePicker from './checklist-date-picker'

type Props = {
  hosId: string
  targetDate: string
}

export default function ClDateSelector({ hosId, targetDate }: Props) {
  const { push } = useRouter()

  const updateDate = (newDate: Date) => {
    const newDateString = format(newDate, 'yyyy-MM-dd')

    push(`/hospital/${hosId}/checklist/${newDateString}/chart`)
  }

  const handleUpdateDate = (days: number) => {
    updateDate(addDays(targetDate, days))
  }

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

      <ChecklistDatePicker hosId={hosId} targetDate={targetDate} />

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
