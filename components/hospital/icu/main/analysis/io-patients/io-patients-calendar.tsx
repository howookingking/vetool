import { Calendar } from '@/components/ui/calendar'
import { ko } from 'date-fns/locale'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils/utils'
import { CalendarDays } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { DateRange } from 'react-day-picker'

export default function IoPatientsCalendar({
  dateRange,
  handleDateRangeChange,
}: {
  dateRange: DateRange | undefined
  handleDateRangeChange: (range: DateRange | undefined) => void
}) {
  return (
    <div className="flex flex-col space-y-2">
      <Label className="pl-4">날짜 선택</Label>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="justify-start text-left font-normal"
          >
            <CalendarDays className="h-3 w-3" />
            <span className="ml-2 text-sm">
              {`${formatDate(dateRange?.from || new Date())} - ${formatDate(dateRange?.to || new Date())}`}
            </span>
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
            mode="range"
            selected={dateRange}
            onSelect={handleDateRangeChange}
            initialFocus
            defaultMonth={new Date()}
            disabled={(date) =>
              date > new Date() || date < new Date('2024-01-01')
            }
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
