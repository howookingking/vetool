import { Button } from '@/components/ui/button'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import {
  useRouter,
  useParams,
  usePathname,
  useSearchParams,
} from 'next/navigation'

import { changeTargetDateInUrl } from '@/lib/utils/utils'
import ChecklistDatePicker from './checklist-date-picker'
import { addDays, format } from 'date-fns'
import { useState } from 'react'
export default function ChecklistDateSelector() {
  const searchParams = useSearchParams()
  const params = useParams()
  const pathname = usePathname()
  const router = useRouter()

  const [targetDate, setTargetDate] = useState(
    new Date(params.target_date as string),
  )
  const updateDate = (newDate: Date) => {
    const newDateString = format(newDate, 'yyyy-MM-dd')
    const pathnamearray: string[] = pathname.split('/')

    router.push(
      `/hospital/${pathnamearray[2]}/checklist/${newDateString}/chart`,
    )
    setTargetDate(newDate)
  }

  const handleUpdateDate = (days: number) => {
    updateDate(addDays(targetDate, days))
  }

  return (
    <div className="flex items-center justify-center gap-1">
      <Button
        onClick={() => handleUpdateDate(-1)}
        size="icon"
        variant="outline"
        className="h-6 w-6 rounded-full"
        aria-label="이전 날짜로 이동"
      >
        <ArrowLeftIcon />
      </Button>
      <ChecklistDatePicker targetDate={format(targetDate, 'yyyy-MM-dd')} />

      <Button
        onClick={() => handleUpdateDate(1)}
        size="icon"
        variant="outline"
        className="h-6 w-6 rounded-full"
        aria-label="다음 날짜로 이동"
      >
        <ArrowRightIcon />
      </Button>
    </div>
  )
}
