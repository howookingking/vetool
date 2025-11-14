import { Checkbox } from '@/components/ui/checkbox'
import type { VisitChart } from '@/constants/hospital/icu/chart/out-and-visit'
import { useSafeRefresh } from '@/hooks/use-realtime-refresh'
import { updateVisitChart } from '@/lib/services/icu/out-and-visit/icu-visit-chart'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

type Props = {
  icuChartId: string
  visitChart: VisitChart
}

export default function CompleteVisitButton({ icuChartId, visitChart }: Props) {
  const isDone = visitChart.is_done

  const safeRefresh = useSafeRefresh()

  const [isDoneState, setIsDoneState] = useState(isDone)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    setIsDoneState(isDone)
  }, [isDone])

  const handleToggleIsDone = async () => {
    setIsUpdating(true)

    setIsDoneState((prev) => !prev)

    const newVisitChart: VisitChart = {
      ...visitChart,
      is_done: !isDoneState,
    }

    await updateVisitChart(icuChartId, newVisitChart)

    toast.success(
      `${isDone ? '면회완료를 취소하였습니다' : '면회를 완료하였습니다'}`,
    )

    setIsUpdating(false)

    safeRefresh()
  }

  return (
    <Checkbox
      checked={isDoneState}
      onClick={handleToggleIsDone}
      disabled={isUpdating}
      className="mr-2"
    />
  )
}
