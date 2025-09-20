'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { updateOutDueDate } from '@/lib/services/icu/chart/update-icu-chart-infos'
import { cn } from '@/lib/utils/utils'
import { format, parseISO } from 'date-fns'
import { ko } from 'date-fns/locale'
import { LogOutIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

type Props = {
  inDate: string
  outDueDate: string | null
  icuIoId: string
  noIcon?: boolean
}

export default function OutDueDate({
  inDate,
  outDueDate,
  icuIoId,
  noIcon,
}: Props) {
  const transformedOutDueDate = outDueDate ? new Date(outDueDate) : undefined

  const [outDueDateInput, setOutDueDateInput] = useState<Date | undefined>(
    transformedOutDueDate,
  )
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const handleUpdateOutDueDate = async (date?: Date) => {
    setIsPopoverOpen(false)
    setOutDueDateInput(date)

    await updateOutDueDate(icuIoId, date ? format(date!, 'yyyy-MM-dd') : null)

    toast.success('퇴원예정일을 변경하였습니다')
  }
  const disabledDates = (date: Date) => date < parseISO(inDate)

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'flex w-full items-center justify-start gap-2 whitespace-pre-wrap px-2',
            !outDueDateInput && 'text-muted-foreground',
          )}
        >
          {noIcon ? (
            <Label
              className="text-xs text-muted-foreground"
              htmlFor="outDueDate"
            >
              퇴원 예정일
            </Label>
          ) : (
            <LogOutIcon className="text-muted-foreground" size={16} />
          )}

          {outDueDateInput ? (
            <span className="truncate text-sm">
              <span>{format(outDueDateInput, 'yyyy-MM-dd')}</span>
            </span>
          ) : (
            <span className="truncate text-sm">
              {noIcon ? '미정' : '퇴원 예정일'}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          locale={ko}
          mode="single"
          selected={outDueDateInput}
          onSelect={handleUpdateOutDueDate}
          className="rounded-b-none rounded-t-md border"
          disabled={disabledDates}
        />
        <Button
          className="w-full rounded-t-none border-t-0"
          size="sm"
          variant="outline"
          onClick={() => handleUpdateOutDueDate(undefined)}
        >
          미정
        </Button>
      </PopoverContent>
    </Popover>
  )
}
