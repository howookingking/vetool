import { TIMES } from '@/constants/hospital/icu/chart/time'
import type { SummaryOrder } from '@/types/icu/summary'
import { TrendingDownIcon, TrendingUpIcon } from 'lucide-react'

export function dailyPatientChange(prevCount: number, todayCount: number) {
  if (prevCount === 0) {
    return <div>전날 환자가 없었습니다</div>
  }

  if (prevCount === todayCount) {
    return <div>전날과 환자수가 동일합니다</div>
  }

  if (prevCount < todayCount) {
    return (
      <div className="flex items-center gap-1">
        전날보다 {todayCount - prevCount}마리 증가하였습니다
        <TrendingUpIcon size={16} className="text-red-500" />
      </div>
    )
  }

  if (prevCount > todayCount) {
    return (
      <div className="flex items-center gap-1">
        전날보다 {prevCount - todayCount}마리 감소하였습니다
        <TrendingDownIcon size={16} className="text-blue-500" />
      </div>
    )
  }
}

export function computeTimeMap(orders: SummaryOrder[]) {
  const timeMap = Object.fromEntries(
    TIMES.map((time) => [time, { hasCrucialTx: false, pendingCount: 0 }]),
  ) as Record<number, { hasCrucialTx: boolean; pendingCount: number }>

  for (const order of orders) {
    for (const time of TIMES) {
      const hasOrder = order.order_times[time] !== '0'
      if (!hasOrder) continue

      const treatments = order.treatments.filter((t) => t.time === time)
      const hasCompleted = treatments.some((t) => t.icu_chart_tx_result)
      const hasCrucialTx = treatments.some((t) => t.is_crucial)

      if (!hasCompleted) timeMap[time].pendingCount += 1
      if (hasCrucialTx) timeMap[time].hasCrucialTx = true
    }
  }

  return timeMap
}
