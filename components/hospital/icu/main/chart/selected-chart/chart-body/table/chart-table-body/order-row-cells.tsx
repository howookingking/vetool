import Cell from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-body/cell'
import NoFecalOrUrineAlert from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/tx/no-fecal-urine-alert'
import { TIMES } from '@/constants/hospital/icu/chart/time'
import type { OrderTimePendingQueue } from '@/lib/store/icu/icu-order'
import type { TxLocalState } from '@/lib/store/icu/icu-tx'
import type { VitalRefRange } from '@/types/adimin'
import type { SelectedIcuOrder, Treatment } from '@/types/icu/chart'
import { useMemo } from 'react'

type Props = {
  hosId: string
  order: SelectedIcuOrder
  showOrderer: boolean
  showTxUser: boolean
  selectedTxPendingQueue: OrderTimePendingQueue[]
  orderTimePendingQueueLength: number
  vitalRefRange: VitalRefRange[]
  species: string
  setOrderTimePendingQueue: (
    updater:
      | OrderTimePendingQueue[]
      | ((prev: OrderTimePendingQueue[]) => OrderTimePendingQueue[]),
  ) => void
  setSelectedTxPendingQueue: (
    updater:
      | OrderTimePendingQueue[]
      | ((prev: OrderTimePendingQueue[]) => OrderTimePendingQueue[]),
  ) => void
  isMutationCanceled: boolean
  setIsMutationCanceled: (isMutationCanceled: boolean) => void
  setTxStep: (txStep: 'closed' | 'detailInsert' | 'selectUser') => void
  setTxLocalState: (updates: Partial<TxLocalState>) => void
  timeGuidelineData: number[]
  orderTimePendingQueue: OrderTimePendingQueue[]
}

export default function OrderRowCells({
  hosId,
  order,
  showOrderer,
  showTxUser,
  selectedTxPendingQueue,
  orderTimePendingQueueLength,
  vitalRefRange,
  species,
  setOrderTimePendingQueue,
  setSelectedTxPendingQueue,
  isMutationCanceled,
  setIsMutationCanceled,
  setTxStep,
  setTxLocalState,
  timeGuidelineData,
  orderTimePendingQueue,
}: Props) {
  const { order_times, order_id, treatments, order_type, order_name } = order

  const foundVital = vitalRefRange.find(
    (vital) => vital.order_name === order_name,
  )
  const rowVitalRefRange = foundVital
    ? foundVital[species as keyof Omit<VitalRefRange, 'order_name'>]
    : undefined

  const noFecalOrUrineResult =
    (order_name === '배변' || order_name === '배뇨') && treatments.length === 0

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
        treatment: Treatment | undefined
        hasOrder: boolean
        hasComment: boolean
        isInPendingQueue: boolean
        isInOrderTimePendingQueue: boolean
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
      const pendingKey = `${order_id}_${time}`

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
    order_times,
    treatments,
    order_id,
    selectedTxPendingMap,
    orderTimePendingMap,
  ])

  const commonCellProps = {
    hosId,
    icuChartOrderId: order_id,
    orderType: order_type,
    orderName: order_name,
    toggleOrderTime,
    showOrderer,
    showTxUser,
    setSelectedTxPendingQueue,
    isMutationCanceled,
    setIsMutationCanceled,
    setTxStep,
    setTxLocalState,
    orderTimePendingQueueLength,
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
            icuChartTxId={cellData.treatment?.tx_id}
            isGuidelineTime={isGuidelineTime}
            hasOrder={cellData.hasOrder}
            hasComment={cellData.hasComment}
            isInPendingQueue={cellData.isInPendingQueue}
            isInOrderTimePendingQueue={cellData.isInOrderTimePendingQueue}
            {...commonCellProps}
          />
        )
      })}

      {noFecalOrUrineResult ? (
        <NoFecalOrUrineAlert orderName={order_name} />
      ) : null}
    </>
  )
}
