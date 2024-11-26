import { Treatment } from '@/types/icu/chart'
import { useMemo } from 'react'

export default function useAbnormalVital(
  treatment?: Treatment,
  rowVitalRefRange?: {
    min: number
    max: number
  },
) {
  const calcVitalResult = useMemo(() => {
    if (rowVitalRefRange && treatment?.tx_result) {
      if (Number(treatment.tx_result) < rowVitalRefRange?.min) return 'below'
      if (Number(treatment.tx_result) > rowVitalRefRange?.max) return 'above'
      if (
        treatment.tx_result === 'p' ||
        treatment.tx_result === 'P' ||
        treatment.tx_result === 'panting' ||
        treatment.tx_result === 'PANTING'
      )
        return 'above'
      return 'normal'
    }
  }, [rowVitalRefRange, treatment?.tx_result])

  const isAbnormalVital = useMemo(
    () => calcVitalResult === 'below' || calcVitalResult === 'above',
    [calcVitalResult],
  )

  return { calcVitalResult, isAbnormalVital }
}
