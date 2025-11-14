'use client'

import { Input } from '@/components/ui/input'
import { useSafeRefresh } from '@/hooks/use-realtime-refresh'
import {
  OutChart,
  updateOutChart,
} from '@/lib/services/icu/out-and-visit/icu-out-chart'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

type Props = {
  type: 'out' | 'visit'
  icuIoId: string
  outChart: OutChart
  isDischarged: boolean
}

export default function ChecklistTime({
  icuIoId,
  outChart,
  type,
  isDischarged,
}: Props) {
  const outTime = outChart.out_time

  const safeRefresh = useSafeRefresh()

  const [timeInput, setTimeInput] = useState<string>(outTime ?? '')

  useEffect(() => {
    setTimeout(() => setTimeInput(outTime ?? ''), 0)
  }, [outTime])

  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur()
    }
  }

  const handleUpdateChecklist = async () => {
    if (outTime === timeInput) return

    const newOutChart: OutChart = {
      ...outChart,
      out_time: timeInput,
    }

    await updateOutChart(icuIoId, newOutChart)

    toast.success('퇴원차트 세부사항을 변경하였습니다')

    safeRefresh()
  }

  return (
    <Input
      type="time"
      disabled={isDischarged}
      value={timeInput}
      onChange={(e) => setTimeInput(e.target.value)}
      onBlur={handleUpdateChecklist}
      onKeyDown={handlePressEnter}
      className="mx-auto w-[120px]"
    />
  )
}
