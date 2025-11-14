'use client'

import { Input } from '@/components/ui/input'
import type { VisitChart } from '@/constants/hospital/icu/chart/out-and-visit'
import { useSafeRefresh } from '@/hooks/use-realtime-refresh'
import { updateVisitChart } from '@/lib/services/icu/out-and-visit/icu-visit-chart'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

type Props = {
  icuChartId: string
  visitChart: VisitChart
}

export default function VisitTimeInput({ icuChartId, visitChart }: Props) {
  const visitTime = visitChart.visit_time
  const isDone = visitChart.is_done

  const safeRefresh = useSafeRefresh()

  const [timeInput, setTimeInput] = useState<string>(visitTime ?? '')

  useEffect(() => {
    setTimeout(() => setTimeInput(visitTime ?? ''), 0)
  }, [visitTime])

  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur()
    }
  }

  const handleUpdateChecklist = async () => {
    if (visitTime === timeInput) return

    const newVisitChart: VisitChart = {
      ...visitChart,
      visit_time: timeInput,
    }

    await updateVisitChart(icuChartId, newVisitChart)

    toast.success('면회차트 세부사항을 변경하였습니다')

    safeRefresh()
  }

  return (
    <Input
      type="time"
      value={timeInput}
      onChange={(e) => setTimeInput(e.target.value)}
      onBlur={handleUpdateChecklist}
      onKeyDown={handlePressEnter}
      className="mx-auto w-[120px]"
      disabled={isDone}
    />
  )
}
