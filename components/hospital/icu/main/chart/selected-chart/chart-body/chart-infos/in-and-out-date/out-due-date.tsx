'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { toast } from '@/components/ui/use-toast'
import { updateOutDueDate } from '@/lib/services/icu/chart/update-icu-chart-infos'
import { cn } from '@/lib/utils/utils'
import { format, parseISO } from 'date-fns'
import { ko } from 'date-fns/locale'
import { LogOut } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'

export default function OutDueDate({
  inDate,
  outDueDate,
  icuIoId,
}: {
  inDate: string
  outDueDate: string | null
  icuIoId: string
}) {
  const transformedOutDueDate = useMemo(
    () => (outDueDate ? new Date(outDueDate) : undefined),
    [outDueDate],
  )
  const [outDueDateInput, setOutDueDateInput] = useState<Date | undefined>(
    transformedOutDueDate,
  )
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const handleUpdateOutDueDate = useCallback(
    async (date?: Date) => {
      setIsPopoverOpen(false)
      setOutDueDateInput(date)

      await updateOutDueDate(icuIoId, date ? format(date!, 'yyyy-MM-dd') : null)

      toast({
        title: '퇴원예정일을 변경하였습니다',
      })
    },
    [icuIoId],
  )

  const disabledDates = useCallback(
    (date: Date) => date < parseISO(inDate),
    [inDate],
  )

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'flex w-full items-center justify-start gap-2 px-2',
            !outDueDateInput && 'text-muted-foreground',
          )}
        >
          <LogOut className="text-muted-foreground" size={16} />

          {outDueDateInput ? (
            <span className="text-xs font-normal md:text-sm">
              {format(outDueDateInput, 'yyyy-MM-dd')}
            </span>
          ) : (
            <span>퇴원 예정일</span>
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
