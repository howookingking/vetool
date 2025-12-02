import { TIMES } from '@/constants/hospital/icu/chart/time'
import type { VitalRefRange } from '@/types/adimin'
import type { SelectedIcuOrder, Treatment } from '@/types/icu/chart'
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
  const { order_times, order_id, treatments, order_name } = order

  const foundVital = vitalRefRange.find(
    (vital) => vital.order_name === order_name,
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
        treatment: Treatment | undefined
        hasOrder: boolean
        hasComment: boolean
      }
    >()

    for (const time of TIMES) {
      const orderer = order_times[time]
      const treatment = treatments.findLast(
        (treatment) => treatment.time === time,
      )
      const isDone =
        orderer !== '0' &&
        treatments.some(
          (treatment) => treatment.time === time && treatment.tx_result,
        )
      const hasOrder = orderer !== '0'
      const hasComment = !!treatment?.tx_comment

      map.set(time, {
        isDone,
        orderer,
        treatment,
        hasOrder,
        hasComment,
      })
    }
    return map
  }, [order_times, treatments, order_id])

  return (
    <>
      {TIMES.map((time) => {
        const cellData = cellDataMap.get(time)!
        const isGuidelineTime = timeGuidelineSet.has(time)
        return (
          <ReadOnlyCell
            time={time}
            icuChartOrderId={order_id}
            isDone={cellData.isDone}
            orderer={cellData.orderer}
            orderName={order_name}
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
