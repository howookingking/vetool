'use client'

import { Input } from '@/components/ui/input'
import type { OutChart } from '@/constants/hospital/icu/chart/out-and-visit'
import { useSafeRefresh } from '@/hooks/use-realtime-refresh'
import { updateOutChart } from '@/lib/services/icu/out-and-visit/icu-out-chart'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

type Props = {
  icuIoId: string
  outChart: OutChart
  isDischarged: boolean
}

export default function OutTimeInput({
  icuIoId,
  outChart,
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
