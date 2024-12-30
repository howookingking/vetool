import Cell from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-body/cell'
import NoFecalOrUrineAlert from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/tx/no-fecal-urine-alert'
import { TIMES } from '@/constants/hospital/icu/chart/time'
import { type OrderTimePendingQueue } from '@/lib/store/icu/icu-order'
import { TxLocalState } from '@/lib/store/icu/tx-mutation'
import type { VitalRefRange } from '@/types/adimin'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { useCallback, useEffect, useState } from 'react'

type OrderRowCellsProps = {
  hosId: string
  preview?: boolean
  order: SelectedIcuOrder
  showOrderer: boolean
  showTxUser: boolean
  selectedTxPendingQueue: OrderTimePendingQueue[]
  orderStep: 'closed' | 'upsert' | 'selectOrderer' | 'multipleEdit'
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
}

export default function OrderRowCells({
  hosId,
  preview,
  order,
  showOrderer,
  showTxUser,
  selectedTxPendingQueue,
  orderStep,
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
}: OrderRowCellsProps) {
  const { order_times, order_id, treatments, order_type, order_name } = order

  const [orderTimeState, setOrderTimeState] = useState(order_times)

  useEffect(() => {
    if (orderStep === 'closed' && orderTimePendingQueueLength === 0) {
      setOrderTimeState(order_times)
    }
  }, [order_times, orderStep, orderTimePendingQueueLength])

  const toggleOrderTime = useCallback(
    (orderId: string, time: number) => {
      if (selectedTxPendingQueue.length > 0) return

      setOrderTimeState((prevOrderTime) => {
        const newOrderTime = [...prevOrderTime]
        newOrderTime[time - 1] = newOrderTime[time - 1] !== '0' ? '0' : '...'
        return newOrderTime
      })

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
    },
    [setOrderTimePendingQueue, selectedTxPendingQueue],
  )

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
        const orderer = orderTimeState[time - 1]
        const tx = treatments.findLast((treatment) => treatment.time === time)
        const isGuidelineTime = timeGuidelineData.includes(time)
        const hasOrder = orderer !== '0'
        const hasComment = !!tx?.tx_comment
        const isInPendingQueue = selectedTxPendingQueue.some(
          (t) => t.orderId === order.order_id && t.orderTime === time,
        )

        return (
          <Cell
            hosId={hosId}
            preview={preview}
            key={time}
            time={time}
            treatment={tx}
            icuChartOrderId={order_id}
            isDone={isDone}
            orderer={orderer}
            orderType={order_type}
            orderName={order_name}
            icuChartTxId={tx?.tx_id}
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
          />
        )
      })}

      {noFecalOrUrineResult && (
        <NoFecalOrUrineAlert orderName={order.order_name} />
      )}
    </>
  )
}
