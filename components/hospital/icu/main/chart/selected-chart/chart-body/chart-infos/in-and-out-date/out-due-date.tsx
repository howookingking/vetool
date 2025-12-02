'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useSafeRefresh } from '@/hooks/use-realtime-refresh'
import { updateOutDueDate } from '@/lib/services/icu/chart/update-icu-chart-infos'
import { cn } from '@/lib/utils/utils'
import { format, parseISO } from 'date-fns'
import { ko } from 'date-fns/locale'
import { LogOutIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

type Props = {
  inDate: string
  outDueDate: string | null
  icuIoId: string
}

export default function OutDueDate({ inDate, outDueDate, icuIoId }: Props) {
  const safeRefresh = useSafeRefresh()

  const [outDueDateInput, setOutDueDateInput] = useState<Date | undefined>(
    outDueDate ? new Date(outDueDate) : undefined,
  )
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  useEffect(() => {
    setTimeout(
      () =>
        setOutDueDateInput(() =>
          outDueDate ? new Date(outDueDate) : undefined,
        ),
      0,
    )
  }, [outDueDate])

  const handleUpdateOutDueDate = async (date?: Date) => {
    setIsPopoverOpen(false)
    setOutDueDateInput(date)

    await updateOutDueDate(icuIoId, date ? format(date!, 'yyyy-MM-dd') : null)

    toast.success('퇴원예정일을 변경하였습니다')
    safeRefresh()
  }

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          size="default"
          variant="outline"
          className={cn(
            'flex w-full items-center justify-start gap-2 px-2 font-normal',
          )}
        >
          <LogOutIcon className="text-muted-foreground" size={16} />

          {outDueDateInput ? (
            <span>{format(outDueDateInput, 'yyyy-MM-dd')}</span>
          ) : (
            <span className="text-muted-foreground">퇴원 예정일</span>
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
          disabled={(date) => date < parseISO(inDate)}
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
