import { TIMES } from '@/constants/hospital/icu/chart/time'
import type { VitalRefRange } from '@/types/adimin'
import type { SelectedIcuOrder, SelectedTreatment } from '@/types/icu/chart'
import { useMemo } from 'react'
import ReadOnlyCell from './read-ony-cell'

type Props = {
  order: SelectedIcuOrder
  showOrderer: boolean
  vitalRefRange: VitalRefRange[]
  species: string
  timeGuidelineData: number[]
}

export default function ReadOnlyOrderRowCells({
  order,
  showOrderer,
  vitalRefRange,
  species,
  timeGuidelineData,
}: Props) {
  const {
    icu_chart_order_time,
    icu_chart_order_id,
    treatments,
    icu_chart_order_name,
  } = order

  const foundVital = vitalRefRange.find(
    (vital) => vital.order_name === icu_chart_order_name,
  )
  const rowVitalRefRange = foundVital
    ? foundVital[species as keyof Omit<VitalRefRange, 'order_name'>]
    : undefined

  const timeGuidelineSet = new Set(timeGuidelineData)

  const cellDataMap = useMemo(() => {
    const map = new Map<
      number,
      {
        isDone: boolean
        orderer: string
        treatment: SelectedTreatment | undefined
        hasOrder: boolean
        hasComment: boolean
      }
    >()

    for (const time of TIMES) {
      const orderer = icu_chart_order_time[time]
      const treatment = treatments.findLast(
        (treatment) => treatment.time === time,
      )
      const isDone =
        orderer !== '0' &&
        treatments.some(
          (treatment) =>
            treatment.time === time && treatment.icu_chart_tx_result,
        )
      const hasOrder = orderer !== '0'
      const hasComment = !!treatment?.icu_chart_tx_comment

      map.set(time, {
        isDone,
        orderer,
        treatment,
        hasOrder,
        hasComment,
      })
    }
    return map
  }, [icu_chart_order_time, treatments])

  return (
    <>
      {TIMES.map((time) => {
        const cellData = cellDataMap.get(time)!
        const isGuidelineTime = timeGuidelineSet.has(time)
        return (
          <ReadOnlyCell
            key={time}
            time={time}
            icuChartOrderId={icu_chart_order_id}
            isDone={cellData.isDone}
            orderer={cellData.orderer}
            orderName={icu_chart_order_name}
            showOrderer={showOrderer}
            isGuidelineTime={isGuidelineTime}
            rowVitalRefRange={rowVitalRefRange}
            hasOrder={cellData.hasOrder}
            hasComment={cellData.hasComment}
            treatment={cellData.treatment}
          />
        )
      })}
    </>
  )
}
