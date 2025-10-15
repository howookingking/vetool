import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type Props = {
  targetDate: string
  hosId: string
}

export default function ClDatePicker({ targetDate, hosId }: Props) {
  const { push } = useRouter()

  const [open, setOpen] = useState(false)

  const handleSelectDate = (date?: Date) => {
    if (date) {
      const formattedDate = format(date, 'yyyy-MM-dd')

      push(`/hospital/${hosId}/checklist/${formattedDate}/chart`)

      setOpen(false)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          className="h-8 px-2 py-0 font-mono text-base font-semibold"
          variant="ghost"
        >
          {format(targetDate, 'yy.MM.dd')}
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
          onSelect={handleSelectDate}
        />
      </PopoverContent>
    </Popover>
  )
}
