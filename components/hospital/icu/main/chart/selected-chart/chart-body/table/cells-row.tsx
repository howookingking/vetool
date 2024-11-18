'use client'

import Cell from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/cell'
import NoFecalOrUrineAlert from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/tx/no-fecal-urine-alert'
import { TIMES } from '@/constants/hospital/icu/chart/time'
import useIsMobile from '@/hooks/use-is-mobile'
import {
  type OrderTimePendingQueue,
  useIcuOrderStore,
} from '@/lib/store/icu/icu-order'
import { useTxMutationStore } from '@/lib/store/icu/tx-mutation'
import type { VitalRefRange } from '@/types/adimin'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { useCallback, useEffect, useMemo, useState } from 'react'

type CellsRowProps = {
  preview?: boolean
  order: SelectedIcuOrder
  showOrderer: boolean
  hoveredColumn: number | null
  handleColumnHover: (columnIndex: number) => void
  handleColumnLeave: () => void
  selectedTxPendingQueue: OrderTimePendingQueue[]
  orderStep: 'closed' | 'upsert' | 'selectOrderer' | 'multipleEdit'
  orderTimePendingQueueLength: number
  vitalRefRange: VitalRefRange[]
  species: string
}

export default function CellsRow({
  preview,
  order,
  showOrderer,
  hoveredColumn,
  handleColumnHover,
  handleColumnLeave,
  selectedTxPendingQueue,
  orderStep,
  orderTimePendingQueueLength,
  vitalRefRange,
  species,
}: CellsRowProps) {
  const isMobile = useIsMobile()

  const { order_times, order_id, treatments } = order
  const {
    setSelectedOrderPendingQueue,
    setOrderTimePendingQueue,
    setSelectedTxPendingQueue,
  } = useIcuOrderStore()

  const {
    isMutationCanceled,
    setIsMutationCanceled,
    setTxStep,
    setTxLocalState,
  } = useTxMutationStore()

  const [orderTimeState, setOrderTimeState] = useState(order_times)

  useEffect(() => {
    if (orderStep === 'closed') {
      setOrderTimeState(order_times)
    }
  }, [order_times, orderStep])

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

  const rowVitalRefRange = useMemo(() => {
    const foundVital = vitalRefRange.find(
      (vital) => vital.order_name === order.order_name,
    )
    return foundVital
      ? foundVital[species as keyof Omit<VitalRefRange, 'order_name'>]
      : undefined
  }, [order.order_name, species, vitalRefRange])

  const noFecalOrUrineResult = useMemo(
    () =>
      (order.order_name === '배변' || order.order_name === '배뇨') &&
      order.treatments.length === 0,
    [order.order_name, order.treatments.length],
  )

  return (
    <>
      {TIMES.map((time, index) => {
        const isDone =
          order_times[index] !== '0' &&
          treatments.some((treatment) => treatment.time === time)
        const orderer = orderTimeState[time - 1]
        const tx = treatments.findLast((treatment) => treatment.time === time)
        const isHovered = hoveredColumn === index + 1
        const isGuidelineTime = [2, 10, 18].includes(time)

        return (
          <Cell
            preview={preview}
            key={time}
            time={time}
            treatment={tx}
            icuChartOrderId={order_id}
            isDone={isDone}
            orderer={orderer}
            icuChartTxId={tx?.tx_id}
            toggleOrderTime={toggleOrderTime}
            showOrderer={showOrderer}
            isHovered={isHovered}
            onMouseEnter={handleColumnHover}
            onMouseLeave={handleColumnLeave}
            isGuidelineTime={isGuidelineTime}
            setSelectedTxPendingQueue={setSelectedTxPendingQueue}
            selectedTxPendingQueue={selectedTxPendingQueue}
            isMutationCanceled={isMutationCanceled}
            setIsMutationCanceled={setIsMutationCanceled}
            setTxStep={setTxStep}
            setTxLocalState={setTxLocalState}
            setSelectedOrderPendingQueue={setSelectedOrderPendingQueue}
            orderTimePendingQueueLength={orderTimePendingQueueLength}
            rowVitalRefRange={rowVitalRefRange}
          />
        )
      })}

      {!isMobile && noFecalOrUrineResult && (
        <NoFecalOrUrineAlert orderName={order.order_name} />
      )}
    </>
  )
}
