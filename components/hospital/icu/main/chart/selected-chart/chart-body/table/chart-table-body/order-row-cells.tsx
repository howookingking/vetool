import Cell from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-body/cell'
import { TIMES } from '@/constants/hospital/icu/chart/time'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { useIcuTxStore } from '@/lib/store/icu/icu-tx'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import type { VitalRefRange } from '@/types/adimin'
import type { SelectedIcuOrder, SelectedTreatment } from '@/types/icu/chart'
import { useMemo } from 'react'

type Props = {
  hosId: string
  order: SelectedIcuOrder
  species: string
}

export default function OrderRowCells({ hosId, order, species }: Props) {
  const {
    icu_chart_order_time,
    icu_chart_order_id,
    treatments,
    icu_chart_order_type,
    icu_chart_order_name,
  } = order

  const {
    basicHosData: { vitalRefRange, timeGuidelineData, showOrderer, showTxUser },
  } = useBasicHosDataContext()
  const {
    orderTimePendingQueue,
    setOrderTimePendingQueue,
    selectedTxPendingQueue,
    setSelectedTxPendingQueue,
  } = useIcuOrderStore()
  const {
    isMutationCanceled,
    setIsMutationCanceled,
    setTxLocalState,
    setTxStep,
  } = useIcuTxStore()

  const foundVital = vitalRefRange.find(
    (vital) => vital.order_name === icu_chart_order_name,
  )
  const rowVitalRefRange = foundVital
    ? foundVital[species as keyof Omit<VitalRefRange, 'order_name'>]
    : undefined

  const toggleOrderTime = (orderId: string, time: number) => {
    setOrderTimePendingQueue((prevQueue) => {
      const isAlreadyQueued = prevQueue.some(
        (entry) => entry.orderId === orderId && entry.orderTime === time,
      )
      if (isAlreadyQueued) {
        return prevQueue.filter(
          (entry) => !(entry.orderId === orderId && entry.orderTime === time),
        )
      }
      return [...prevQueue, { orderId, orderTime: time }]
    })
  }

  const timeGuidelineSet = new Set(timeGuidelineData)
  const selectedTxPendingMap = useMemo(() => {
    const map = new Map<string, boolean>()
    for (const item of selectedTxPendingQueue) {
      map.set(`${item.orderId}_${item.orderTime}`, true)
    }
    return map
  }, [selectedTxPendingQueue])

  const orderTimePendingMap = useMemo(() => {
    const map = new Map<string, boolean>()
    for (const item of orderTimePendingQueue) {
      map.set(`${item.orderId}_${item.orderTime}`, true)
    }
    return map
  }, [orderTimePendingQueue])

  const cellDataMap = useMemo(() => {
    const map = new Map<
      number,
      {
        isDone: boolean
        orderer: string
        treatment: SelectedTreatment | undefined
        hasOrder: boolean
        hasComment: boolean
        isInPendingQueue: boolean
        isInOrderTimePendingQueue: boolean
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
      const pendingKey = `${icu_chart_order_id}_${time}`

      map.set(time, {
        isDone,
        orderer,
        treatment,
        hasOrder,
        hasComment,
        isInPendingQueue: selectedTxPendingMap.get(pendingKey) || false,
        isInOrderTimePendingQueue: orderTimePendingMap.get(pendingKey) || false,
      })
    }
    return map
  }, [
    icu_chart_order_time,
    treatments,
    icu_chart_order_id,
    selectedTxPendingMap,
    orderTimePendingMap,
  ])

  const commonCellProps = {
    hosId,
    icuChartOrderId: icu_chart_order_id,
    orderType: icu_chart_order_type,
    orderName: icu_chart_order_name,
    toggleOrderTime,
    showOrderer,
    showTxUser,
    setSelectedTxPendingQueue,
    isMutationCanceled,
    setIsMutationCanceled,
    setTxStep,
    setTxLocalState,
    orderTimePendingQueueLength: orderTimePendingQueue.length,
    rowVitalRefRange,
    selectedTxPendingQueue,
  }

  return (
    <>
      {TIMES.map((time) => {
        const cellData = cellDataMap.get(time)!
        const isGuidelineTime = timeGuidelineSet.has(time)
        return (
          <Cell
            key={time}
            time={time}
            treatment={cellData.treatment}
            isDone={cellData.isDone}
            orderer={cellData.orderer}
            icuChartTxId={cellData.treatment?.icu_chart_tx_id}
            isGuidelineTime={isGuidelineTime}
            hasOrder={cellData.hasOrder}
            hasComment={cellData.hasComment}
            isInPendingQueue={cellData.isInPendingQueue}
            isInOrderTimePendingQueue={cellData.isInOrderTimePendingQueue}
            {...commonCellProps}
          />
        )
      })}
    </>
  )
}
