import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { registerPatientFormSchema } from '@/lib/schemas/patient/patient-schema'
import { differenceInMonths, differenceInYears, format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { Calendar as CalendarIcon } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

type Props = {
  form: UseFormReturn<z.infer<typeof registerPatientFormSchema>>
  birth?: Date
}

export default function BirthDatePicker({ form, birth }: Props) {
  const isDatePick = useRef(true)

  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [yearInput, setYearInput] = useState('')
  const [monthInput, setMonthInput] = useState('')
  const [dateInput, setDateInput] = useState('')

  const updateBirthDate = useCallback(
    (date: Date) => {
      form.setValue('birth', date)
      setDateInput(format(date, 'yyyy-MM-dd'))

      const now = new Date()
      const years = differenceInYears(now, date)
      const months = differenceInMonths(now, date) % 12

      setYearInput(years > 0 ? years.toString() : '')
      setMonthInput(months > 0 ? months.toString() : '')
    },
    [form],
  )

  useEffect(() => {
    if (birth) updateBirthDate(birth)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isDatePick.current) return

    // 직접 N살 N개월을  입력하는 경우
    if (yearInput || monthInput) {
      const now = new Date()
      let years = parseInt(yearInput) || 0
      let months = parseInt(monthInput) || 0
      let newDate = new Date(
        now.getFullYear() - years,
        now.getMonth() - months,
        now.getDate(),
      )

      updateBirthDate(newDate)
    }
  }, [yearInput, monthInput, updateBirthDate])

  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setDateInput(value)
  }

  // N살 입력 input chagne
  const handleYearInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value.length > 2 || Number(value) < 0) return
    isDatePick.current = false

    setYearInput(value)
  }

  // N개월 입력 input change
  const handleMonthInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (Number(value) > 12 || Number(value) < 0) return
    isDatePick.current = false
    setMonthInput(value)
  }

  return (
    <FormField
      control={form.control}
      name="birth"
      render={({ field }) => (
        <FormItem className="flex flex-col justify-end">
          <FormLabel>
            생년월일 <span className="text-destructive">*</span>
          </FormLabel>
          <div className="flex flex-col items-center gap-2 sm:flex-row">
            {/* 직접 입력 */}
            <div className="flex w-full items-center justify-between gap-2">
              <div className="relative w-full">
                <Input
                  type="number"
                  value={yearInput}
                  onChange={handleYearInputChange}
                  className="h-8 text-sm"
                  max={99}
                />
                <span className="absolute right-2 top-2 text-xs">살</span>
              </div>
              <div className="relative w-full">
                <Input
                  type="number"
                  value={monthInput}
                  onChange={handleMonthInputChange}
                  className="h-8 text-sm"
                />
                <span className="absolute right-2 top-2 text-xs">개월</span>
              </div>

              <span className="shrink-0">OR</span>
            </div>

            {/* Date Picker */}
            <div className="flex">
              <Input
                type="text"
                value={dateInput}
                onChange={handleDateInputChange}
                disabled
                className="h-8 text-sm"
                placeholder="생년월일 (YYYYMMDD)"
              />
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-8 w-8 border-none px-2"
                    aria-label="Open calendar"
                  >
                    <CalendarIcon className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    className="z-50"
                    styles={{
                      caption_label: { display: 'none' },
                      dropdown_month: { fontSize: 14 },
                      dropdown_year: { fontSize: 14 },
                      button: { fontSize: 14 },
                    }}
                    captionLayout="dropdown-buttons"
                    fromYear={1900}
                    toYear={new Date().getFullYear()}
                    locale={ko}
                    selected={field.value || birth}
                    defaultMonth={field.value || birth}
                    mode="single"
                    onSelect={(date) => {
                      if (date) {
                        updateBirthDate(date)
                        setIsPopoverOpen(false)
                        isDatePick.current = true
                      }
                    }}
                    disabled={(date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  )
}
