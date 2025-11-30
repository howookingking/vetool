import PulsingDot from '@/components/hospital/common/pulsing-dot'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { changeTargetDateInUrl } from '@/lib/utils/utils'
import { format, isToday } from 'date-fns'
import { ko } from 'date-fns/locale'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { DayContentProps } from 'react-day-picker'

export default function IcuDatePicker({ targetDate }: { targetDate: string }) {
  const searchParams = useSearchParams()
  const path = usePathname()
  const { push } = useRouter()

  const handleSelectDate = (date: Date | undefined) => {
    if (date) {
      const formattedDate = format(date, 'yyyy-MM-dd')
      const newPath = changeTargetDateInUrl(
        path,
        formattedDate,
        new URLSearchParams(searchParams),
      )
      push(newPath as any)
    }
  }

  const DayWithDot = (props: DayContentProps) => {
    const { date } = props
    const today = isToday(date)

    return (
      <div className="relative flex items-center justify-center">
        {props.date.getDate()}
        {today && <PulsingDot className="-right-2 -top-2" />}
      </div>
    )
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="relative h-8 px-2 py-0 font-mono text-base font-semibold"
          variant="ghost"
        >
          {format(targetDate, 'yy.MM.dd')}
          {isToday(new Date(targetDate)) && (
            <PulsingDot className="right-0 top-0" />
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          className="text-sm"
          styles={{ button: { fontSize: 12 } }}
          captionLayout="dropdown-buttons"
          showOutsideDays
          fixedWeeks
          locale={ko}
          mode="single"
          initialFocus
          selected={new Date(targetDate)}
          onSelect={handleSelectDate}
          components={{
            DayContent: DayWithDot,
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
