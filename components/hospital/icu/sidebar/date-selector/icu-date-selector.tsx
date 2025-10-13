import { Button } from '@/components/ui/button'
import { changeTargetDateInUrl } from '@/lib/utils/utils'
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons'
import { addDays, format } from 'date-fns'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import IcuDatePicker from './icu-date-picker'

export default function IcuDateSelector({
  targetDate,
}: {
  targetDate: string
}) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { push } = useRouter()

  const updateDate = (newDate: Date) => {
    const newDateString = format(newDate, 'yyyy-MM-dd')

    const newPath = changeTargetDateInUrl(
      pathname,
      newDateString,
      new URLSearchParams(searchParams),
    )

    push(newPath)
  }

  const handleUpdateDate = (days: number) => {
    updateDate(addDays(targetDate, days))
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        onClick={() => handleUpdateDate(-1)}
        size="icon"
        variant="ghost"
        className="h-8 w-8 rounded-full"
        aria-label="이전 날짜로 이동"
      >
        <ArrowLeftIcon className="stroke-black" />
      </Button>

      <IcuDatePicker targetDate={targetDate} />

      <Button
        onClick={() => handleUpdateDate(1)}
        size="icon"
        variant="ghost"
        className="h-8 w-8 rounded-full"
        aria-label="다음 날짜로 이동"
      >
        <ArrowRightIcon className="stroke-black" />
      </Button>
    </div>
  )
}
