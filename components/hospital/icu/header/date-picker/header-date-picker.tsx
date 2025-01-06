import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { changeTargetDateInUrl } from '@/lib/utils/utils'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function HeaderDatePicker({
  targetDate,
  setIsSubscriptionReady,
}: {
  targetDate: string
  setIsSubscriptionReady: (isSubscriptionReady: boolean) => void
}) {
  const { push } = useRouter()
  const [open, setOpen] = useState(false)
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const path = usePathname()

  const handleSelectDate = (date: Date | undefined) => {
    if (date) {
      const formattedDate = format(date, 'yyyy-MM-dd')
      const newPath = changeTargetDateInUrl(path, formattedDate, params)
      push(newPath)
      setOpen(false)
      setIsSubscriptionReady(false)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button className="min-w-20 px-1.5 text-base" variant="ghost">
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
        />
      </PopoverContent>
    </Popover>
  )
}
