'use client'

import DeleteOrdersAlertDialog from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/delete-orders-alert-dialog'
import SortableOrderWrapper from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/sortable-order-wrapper'
import TxUpsertDialog from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/tx/tx-upsert-dialog'
import { Table, TableRow } from '@/components/ui/table'
import { toast } from '@/components/ui/use-toast'
import useIsCommandPressed from '@/hooks/use-is-command-pressed'
import useIsMobile from '@/hooks/use-is-mobile'
import useLocalStorage from '@/hooks/use-local-storage'
import useShorcutKey from '@/hooks/use-shortcut-key'
import { upsertOrder } from '@/lib/services/icu/chart/order-mutation'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { useTxMutationStore } from '@/lib/store/icu/tx-mutation'
import { formatOrders } from '@/lib/utils/utils'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import type { SelectedChart, SelectedIcuOrder } from '@/types/icu/chart'
import { RefObject, useCallback, useEffect, useState } from 'react'
import { Sortable } from 'react-sortablejs'
import CellsRowTitle from './cells-row-title'
import ChartTableBody from './chart-table-body/chart-table-body'
import ChartTableHeader from './chart-table-header/chart-table-header'
import AddTemplateOrderDialog from './order/template/add-template-order-dialog'

export default function ChartTable({
  chartData,
  preview,
  isExport,
  cellRef,
  isTouchMove,
}: {
  chartData: SelectedChart
  preview?: boolean
  isExport?: boolean
  cellRef?: RefObject<HTMLTableRowElement>
  isTouchMove?: boolean
}) {
  const {
    icu_chart_id,
    orders,
    patient: { hos_id },
    target_date,
  } = chartData

  const [isSorting, setIsSorting] = useState(false)
  const [orderWidth, setOrderWidth] = useLocalStorage('orderWidth', 400)
  const [sortedOrders, setSortedOrders] = useState<SelectedIcuOrder[]>(orders)
  const [isDeleteOrdersDialogOpen, setIsDeleteOrdersDialogOpen] =
    useState(false)
  const {
    orderStep,
    setOrderStep,
    reset,
    selectedTxPendingQueue,
    orderTimePendingQueue,
    selectedOrderPendingQueue,
    copiedOrderPendingQueue,
    isEditOrderMode,
  } = useIcuOrderStore()

  const isMobile = useIsMobile()
  const {
    basicHosData: { showOrderer, vetsListData, vitalRefRange },
  } = useBasicHosDataContext()
  const isCommandPressed = useIsCommandPressed()

  useEffect(() => {
    if (!isSorting) {
      setSortedOrders(orders)
    }
  }, [isSorting, orders])

  // ----- 표에서 수직 안내선 -----
  const [hoveredColumn, setHoveredColumn] = useState<number | null>(null)
  const handleColumnHover = useCallback(
    (columnIndex: number) => setHoveredColumn(columnIndex),
    [],
  )
  const handleColumnLeave = useCallback(() => setHoveredColumn(null), [])
  // --------------------------

  const handleUpsertOrderTimesWithoutOrderer = useCallback(async () => {
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
        hos_id,
        icu_chart_id,
        order.orderId,
        updatedOrderTimes,
        {
          icu_chart_order_name: currentOrder.order_name,
          icu_chart_order_comment: currentOrder.order_comment,
          icu_chart_order_type: currentOrder.order_type,
          icu_chart_order_priority: currentOrder.id,
        },
      )
    }

    toast({
      title: '오더시간을 변경하였습니다',
    })

    reset()
  }, [hos_id, icu_chart_id, orderTimePendingQueue, orders, reset, vetsListData])

  // -------- 커멘드키 뗐을 때 작업 --------
  const { txStep, setTxStep } = useTxMutationStore()
  useEffect(() => {
    if (!isCommandPressed && orderTimePendingQueue.length >= 1) {
      showOrderer
        ? setOrderStep('selectOrderer')
        : handleUpsertOrderTimesWithoutOrderer()
    }
    if (!isCommandPressed && selectedTxPendingQueue.length >= 1) {
      if (txStep === 'closed') {
        setTxStep('detailInsert')
      }
    }
  }, [
    handleUpsertOrderTimesWithoutOrderer,
    isCommandPressed,
    orderTimePendingQueue,
    selectedTxPendingQueue,
    selectedTxPendingQueue.length,
    setOrderStep,
    setTxStep,
    showOrderer,
    txStep,
  ])
  // ---------------------------------

  // --------- 다중 오더 붙여넣기, 삭제 기능 ---------
  const handleUpsertOrderWithoutOrderer = useCallback(async () => {
    for (const order of copiedOrderPendingQueue) {
      await upsertOrder(hos_id, icu_chart_id, undefined, order.order_times!, {
        icu_chart_order_name: order.order_name!,
        icu_chart_order_comment: order.order_comment!,
        icu_chart_order_type: order.order_type!,
        icu_chart_order_priority: order.id!,
      })
    }

    toast({
      title: '오더를 붙여넣었습니다',
    })

    reset()
  }, [hos_id, icu_chart_id, copiedOrderPendingQueue, reset])

  useShorcutKey({
    keys: ['v'],
    condition: copiedOrderPendingQueue.length > 0,
    callback: showOrderer
      ? () => setOrderStep('selectOrderer')
      : () => handleUpsertOrderWithoutOrderer(),
  })

  useShorcutKey({
    keys: ['backspace', 'delete'],
    condition: selectedOrderPendingQueue.length > 0,
    callback: () => setIsDeleteOrdersDialogOpen(true),
  })

  const handleReorder = useCallback(
    (event: Sortable.SortableEvent) => {
      const newOrders = [...sortedOrders]
      const [movedOrder] = newOrders.splice(event.oldIndex as number, 1)
      newOrders.splice(event.newIndex as number, 0, movedOrder)
      setSortedOrders(newOrders)
    },
    [sortedOrders],
  )

  return (
    <Table className="border">
      <ChartTableHeader
        chartData={chartData}
        hosId={hos_id}
        isSorting={isSorting}
        setIsSorting={setIsSorting}
        preview={preview}
        sortedOrders={sortedOrders}
        showOrderer={showOrderer}
        orderStep={orderStep}
        reset={reset}
        isEditOrderMode={isEditOrderMode}
        setOrderStep={setOrderStep}
        isExport={isExport}
        setSortedOrders={setSortedOrders}
        orderWidth={orderWidth}
        setOrderWidth={setOrderWidth}
        isTouchMove={isTouchMove}
        isMobile={isMobile}
      />

      {isSorting ? (
        <SortableOrderWrapper
          orders={sortedOrders}
          onOrdersChange={setSortedOrders}
          onSortEnd={handleReorder}
        >
          {sortedOrders.map((order, index) => (
            <TableRow className="relative w-full divide-x" key={order.order_id}>
              <CellsRowTitle
                index={index}
                order={order}
                preview={preview}
                isSorting={isSorting}
                orderWidth={orderWidth}
                isMobile={isMobile}
              />
            </TableRow>
          ))}
        </SortableOrderWrapper>
      ) : (
        <ChartTableBody
          isSorting={isSorting}
          sortedOrders={sortedOrders}
          preview={preview}
          handleColumnHover={handleColumnHover}
          handleColumnLeave={handleColumnLeave}
          vitalRefRange={vitalRefRange}
          showOrderer={showOrderer}
          hoveredColumn={hoveredColumn}
          selectedTxPendingQueue={selectedTxPendingQueue}
          orderStep={orderStep}
          orderTimePendingQueue={orderTimePendingQueue}
          orderWidth={orderWidth}
          isMobile={isMobile}
          isTouchMove={isTouchMove}
          isExport={isExport}
          icuChartId={icu_chart_id}
          setSortedOrders={setSortedOrders}
          cellRef={cellRef}
        />
      )}

      {!isExport && (
        <>
          <TxUpsertDialog />
          <DeleteOrdersAlertDialog
            isDeleteOrdersDialogOpen={isDeleteOrdersDialogOpen}
            setIsDeleteOrdersDialogOpen={setIsDeleteOrdersDialogOpen}
            setSortedOrders={setSortedOrders}
          />
          <AddTemplateOrderDialog hosId={hos_id} targetDate={target_date} />
        </>
      )}
    </Table>
  )
}
