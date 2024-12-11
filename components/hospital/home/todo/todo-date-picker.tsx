import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn, formatDate } from '@/lib/utils/utils'
import { ko } from 'date-fns/locale'
import { CalendarDays } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

export default function TodoDatePicker({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: Date
  setSelectedDate: Dispatch<SetStateAction<Date>>
}) {
  const today = new Date()

  const handleSelectDate = (date?: Date) => {
    setSelectedDate(date || new Date())
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn('justify-start text-left font-normal')}
        >
          <CalendarDays className="h-3 w-3" />
          <span className="ml-2 text-xs">{formatDate(selectedDate)}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
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
          selected={selectedDate}
          onSelect={handleSelectDate}
          disabled={(date) => date > today || date < new Date('2024-01-01')}
          defaultMonth={selectedDate}
        />
      </PopoverContent>
    </Popover>
  )
}
