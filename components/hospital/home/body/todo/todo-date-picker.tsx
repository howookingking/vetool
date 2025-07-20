import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { formatDate } from '@/lib/utils/utils'
import { ko } from 'date-fns/locale'
import { CalendarDays } from 'lucide-react'
import { type Dispatch, type SetStateAction, useState } from 'react'

type Props = {
  selectedDate: Date
  setSelectedDate: Dispatch<SetStateAction<Date>>
}

export default function TodoDatePicker({
  selectedDate,
  setSelectedDate,
}: Props) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const handleSelectDate = (date?: Date) => {
    setSelectedDate(date!)
    setIsPopoverOpen(false)
  }

  const formattedSelectedDate = formatDate(selectedDate)

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="text-md">
          <CalendarDays />
          {formattedSelectedDate}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0">
        <Calendar
          className="text-sm"
          captionLayout="dropdown-buttons"
          showOutsideDays
          fixedWeeks
          locale={ko}
          mode="single"
          initialFocus
          selected={selectedDate}
          onSelect={handleSelectDate}
          defaultMonth={selectedDate}
        />
      </PopoverContent>
    </Popover>
  )
}
