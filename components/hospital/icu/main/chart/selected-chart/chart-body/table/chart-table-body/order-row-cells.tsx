import Cell from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-body/cell'
import NoFecalOrUrineAlert from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/tx/no-fecal-urine-alert'
import { TIMES } from '@/constants/hospital/icu/chart/time'
import type { OrderTimePendingQueue } from '@/lib/store/icu/icu-order'
import type { TxLocalState } from '@/lib/store/icu/icu-tx'
import type { VitalRefRange } from '@/types/adimin'
import type { SelectedIcuOrder } from '@/types/icu/chart'

type Props = {
  hosId: string
  preview?: boolean
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
  preview,
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

  const toggleOrderTime = (orderId: string, time: number) => {
    if (selectedTxPendingQueue.length > 0) return

    setOrderTimePendingQueue((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.orderId === orderId && item.orderTime === time,
      )

      if (existingIndex !== -1) {
        return prev.filter((_, index) => index !== existingIndex)
      } else {
        return [...prev, { orderId, orderTime: time }]
      }
    })
  }

  const foundVital = vitalRefRange.find(
    (vital) => vital.order_name === order.order_name,
  )
  const rowVitalRefRange = foundVital
    ? foundVital[species as keyof Omit<VitalRefRange, 'order_name'>]
    : undefined

  const noFecalOrUrineResult =
    (order.order_name === '배변' || order.order_name === '배뇨') &&
    order.treatments.length === 0

  return (
    <>
      {TIMES.map((time, index) => {
        const isDone =
          order_times[index] !== '0' &&
          treatments.some(
            (treatment) => treatment.time === time && treatment.tx_result,
          )
        const orderer = order_times[time - 1]
        const treatment = treatments.findLast(
          (treatment) => treatment.time === time,
        )
        const isGuidelineTime = timeGuidelineData.includes(time)
        const hasOrder = orderer !== '0'
        const hasComment = !!treatment?.tx_comment
        const isInPendingQueue = selectedTxPendingQueue.some(
          (t) => t.orderId === order.order_id && t.orderTime === time,
        )
        const isInOrderTimePendingQueue = orderTimePendingQueue.some(
          (t) => t.orderId === order.order_id && t.orderTime === time,
        )

        return (
          <Cell
            hosId={hosId}
            preview={preview}
            key={time}
            time={time}
            treatment={treatment}
            icuChartOrderId={order_id}
            isDone={isDone}
            orderer={orderer}
            orderType={order_type}
            orderName={order_name}
            icuChartTxId={treatment?.tx_id}
            toggleOrderTime={toggleOrderTime}
            showOrderer={showOrderer}
            showTxUser={showTxUser}
            isGuidelineTime={isGuidelineTime}
            setSelectedTxPendingQueue={setSelectedTxPendingQueue}
            isMutationCanceled={isMutationCanceled}
            setIsMutationCanceled={setIsMutationCanceled}
            setTxStep={setTxStep}
            setTxLocalState={setTxLocalState}
            orderTimePendingQueueLength={orderTimePendingQueueLength}
            rowVitalRefRange={rowVitalRefRange}
            hasOrder={hasOrder}
            hasComment={hasComment}
            isInPendingQueue={isInPendingQueue}
            isInOrderTimePendingQueue={isInOrderTimePendingQueue}
          />
        )
      })}

      {noFecalOrUrineResult && !preview && (
        <NoFecalOrUrineAlert orderName={order.order_name} />
      )}
    </>
  )
}
