'use client'

import LargeLoaderCircle from '@/components/common/large-loader-circle'
import OrderDialog from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/order-dialog'
import TxUpsertDialog from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/tx/tx-upsert-dialog'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { toast } from '@/components/ui/use-toast'
import { TIMES } from '@/constants/hospital/icu/chart/time'
import useIsCommandPressed from '@/hooks/use-is-command-pressed'
import { upsertOrder } from '@/lib/services/icu/chart/order-mutation'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { useTxMutationStore } from '@/lib/store/icu/tx-mutation'
import { formatOrders, sortOrders } from '@/lib/utils'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import type { SelectedChart, SelectedIcuOrder } from '@/types/icu/chart'
import { useCallback, useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import CellsRow from './cells-row'
import CellsRowTitle from './cells-row-title'
import DeleteOrdersAlertDialog from './order/delete-orders-alert-dialog'

export default function ChartTable({
  chartData,
  preview,
}: {
  chartData: SelectedChart
  preview?: boolean
}) {
  const {
    icu_chart_id,
    orders,
    patient,
    weight,
    icu_io: { age_in_days },
  } = chartData
  const [sortedOrders, setSortedOrders] = useState<SelectedIcuOrder[]>([])
  const [isSorting, setIsSorting] = useState(true)
  const [isDeleteOrdersDialogOpen, setIsDeleteOrdersDialogOpen] =
    useState(false)

  const { setStep, reset, orderTimePendingQueue, orderPendingQueue } =
    useIcuOrderStore()
  const { setStep: setTxStep } = useTxMutationStore()
  const {
    basicHosData: { showOrderer, vetsListData },
  } = useBasicHosDataContext()
  const isCommandPressed = useIsCommandPressed()

  useEffect(() => {
    setIsSorting(true)
    setSortedOrders(sortOrders(orders))
    setIsSorting(false)
  }, [orders])

  // -----표에서 수직안내선-----
  const [hoveredColumn, setHoveredColumn] = useState<number | null>(null)
  const handleColumnHover = useCallback(
    (columnIndex: number) => setHoveredColumn(columnIndex),
    [],
  )
  const handleColumnLeave = useCallback(() => setHoveredColumn(null), [])
  // -----표에서 수직안내선-----

  const handleUpsertMultipleOrderTimesWithoutOrderer = useCallback(async () => {
    const formattedOrders = formatOrders(orderTimePendingQueue)

    for (const order of formattedOrders) {
      const currentOrder = orders.find((o) => o.order_id === order.orderId)
      if (!currentOrder) continue

      const updatedOrderTimes = currentOrder.order_times.map((time, index) =>
        order.orderTimes.includes(index + 1)
          ? time === '0'
            ? vetsListData[0].name
            : '0'
          : time,
      )

      await upsertOrder(
        chartData.patient.hos_id,
        icu_chart_id,
        order.orderId,
        updatedOrderTimes,
        {
          icu_chart_order_name: currentOrder.order_name,
          icu_chart_order_comment: currentOrder.order_comment,
          icu_chart_order_type: currentOrder.order_type,
        },
      )
    }

    toast({
      title: '오더시간을 변경하였습니다',
    })

    reset()
  }, [
    chartData.patient.hos_id,
    icu_chart_id,
    orderTimePendingQueue,
    orders,
    reset,
    vetsListData,
  ])

  const debouncedUpsertOrderTimes = useDebouncedCallback(
    showOrderer
      ? () => setStep('selectOrderer')
      : handleUpsertMultipleOrderTimesWithoutOrderer,
    1500,
  )

  const handleMultipleTreatments = useCallback(() => {
    if (orderTimePendingQueue.length >= 2) setTxStep('detailInsert')
  }, [orderTimePendingQueue.length, setTxStep])

  useEffect(() => {
    if (!isCommandPressed && orderTimePendingQueue.length > 0) {
      handleMultipleTreatments()
    }
  }, [isCommandPressed, orderTimePendingQueue, handleMultipleTreatments])

  // -----다중 오더 붙여넣기, 삭제 기능-----
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key === 'v' &&
        orderPendingQueue.length > 0
      ) {
        event.preventDefault()
        setStep('selectOrderer')
      }

      if (
        ((event.metaKey && event.key === 'Backspace') ||
          event.key === 'Delete') &&
        orderPendingQueue.length > 0
      ) {
        event.preventDefault()
        setIsDeleteOrdersDialogOpen(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [setStep, orderPendingQueue])
  // -----다중 오더 붙여넣기, 삭제 기능-----

  if (isSorting) {
    return <LargeLoaderCircle className="h-icu-chart" />
  }

  return (
    <Table className="border">
      <TableHeader className="sticky top-0 z-10 bg-white shadow-sm">
        <TableRow>
          <TableHead className="relative flex w-[320px] items-center justify-center gap-2 text-center">
            <span>오더 목록</span>
            {!preview && (
              <OrderDialog
                icuChartId={icu_chart_id}
                orders={orders}
                showOrderer={showOrderer}
                patient={patient}
                weight={weight}
                ageInDays={age_in_days}
              />
            )}
          </TableHead>

          {TIMES.map((time) => (
            <TableHead className="border text-center" key={time}>
              {time.toString().padStart(2, '0')}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {!preview && <TxUpsertDialog />}

        {sortedOrders.map((order) => (
          <TableRow className="divide-x" key={order.order_id}>
            <CellsRowTitle order={order} preview={preview} />
            <CellsRow
              preview={preview}
              order={order}
              debouncedUpsertOrderTimes={debouncedUpsertOrderTimes}
              // debouncedMultipleTreatments={debouncedMultipleTreatments}
              handleMultipleTreatments={handleMultipleTreatments}
              showOrderer={showOrderer}
              hoveredColumn={hoveredColumn}
              handleColumnHover={handleColumnHover}
              handleColumnLeave={handleColumnLeave}
            />
          </TableRow>
        ))}
      </TableBody>

      <DeleteOrdersAlertDialog
        isDeleteOrdersDialogOpen={isDeleteOrdersDialogOpen}
        setIsDeleteOrdersDialogOpen={setIsDeleteOrdersDialogOpen}
      />
    </Table>
  )
}
