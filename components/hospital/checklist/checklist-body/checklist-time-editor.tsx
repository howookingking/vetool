'use client'
import { useEffect, useState } from 'react'
import { ChevronDownIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { timeInterval } from '@/constants/checklist/checklist'

type Props = {
  pretime: string
  timename: string
  setTime: (time: Date, timename: string) => void
}

export default function ChecklistTimeEditor({
  pretime,
  timename,
  setTime,
}: Props) {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [interval, setInterval] = useState<string>('0')
  useEffect(() => {
    pretime && setDate(new Date(pretime))
  }, [pretime])

  const setTimeToDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hhmmss = e.target.value
    const [hh, mm, ss] = hhmmss.split(':').map(Number)
    date?.setHours(hh)
    date?.setMinutes(mm)
    date?.setSeconds(ss)
    const interval = date && timeInterval(pretime, String(new Date(date)))[0]
    interval && setInterval(interval)
    setDate(date)
  }

  const changeDate = (selectedDate: Date | undefined) => {
    if (selectedDate && date) {
      selectedDate.setHours(date.getHours())
      selectedDate.setMinutes(date.getMinutes())
      selectedDate.setSeconds(date.getSeconds())
      const posttime = String(new Date(selectedDate))
      const interval = timeInterval(pretime, posttime)[0]
      setInterval(interval)
      setDate(selectedDate)
      setOpen(false)
    }
  }
  return (
    <div className="flex-col">
      <div className="flex gap-4">
        <div className="flex flex-col gap-3">
          <Label htmlFor="date-picker" className="px-1">
            Date
          </Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date-picker"
                className="w-32 justify-between font-normal"
              >
                {date ? date.toLocaleDateString() : 'Select date'}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={date}
                captionLayout="dropdown"
                onSelect={changeDate}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="time-picker" className="px-1">
            Time
          </Label>
          <Input
            type="time"
            id="time-picker"
            step="1"
            defaultValue={
              date &&
              String(date.getHours()).padStart(2, '0') +
                ':' +
                String(date.getMinutes()).padStart(2, '0') +
                ':' +
                String(date.getSeconds()).padStart(2, '0')
            }
            onChange={setTimeToDate}
            className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => {
            if (date) setTime(date, timename)
          }}
        >
          SET
        </Button>
      </div>
      {timename === 'starttime' && date && date !== new Date(pretime) && (
        <div className="flex">기존 시작시간에서 {interval}분 변화</div>
      )}
    </div>
  )
}
