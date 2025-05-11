import type { ChartableVital } from '@/constants/hospital/icu/chart/vital-chart'
import { purifyVitalValue } from '@/lib/utils/vital-chart'
import { Treatment } from '@/types/icu/chart'

export default function useAbnormalVital(
  orderName: string,
  treatment?: Treatment,
  rowVitalRefRange?: {
    min: number
    max: number
  },
) {
  // 바이탈 결과를 계산하여 'below', 'above', 'normal' 반환
  const calcVitalResult = () => {
    if (
      !rowVitalRefRange ||
      !treatment?.tx_result ||
      treatment.tx_result === null
    ) {
      return undefined
    }

    const result = treatment.tx_result

    const purifiedResult = purifyVitalValue(orderName as ChartableVital, result)

    if (purifiedResult < rowVitalRefRange.min) {
      return 'below'
    }

    if (purifiedResult > rowVitalRefRange.max) {
      return 'above'
    }

    return 'normal'
  }

  const isAbnormalVital =
    calcVitalResult() === 'below' || calcVitalResult() === 'above'

  return { calcVitalResult: calcVitalResult(), isAbnormalVital }
}
