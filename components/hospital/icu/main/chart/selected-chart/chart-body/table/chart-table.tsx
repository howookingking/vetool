'use client'

import ChartTableBody from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-body/chart-table-body'
import SortingOrderRows from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-body/sorting-order-rows'
import ChartTableHeader from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-header/chart-table-header'
import DeleteOrdersAlertDialog from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/delete-orders-alert-dialog'
import SelectedOrderActionDialog from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/selected-order-action-dialog'
import AddTemplateOrderDialog from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/template/add-template-order-dialog'
import TxUpsertDialog from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/tx/tx-upsert-dialog'
import { Table } from '@/components/ui/table'
import { toast } from '@/components/ui/use-toast'
import useIsCommandPressed from '@/hooks/use-is-command-pressed'
import useIsMobile from '@/hooks/use-is-mobile'
import useLocalStorage from '@/hooks/use-local-storage'
import { upsertOrder } from '@/lib/services/icu/chart/order-mutation'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { useTxMutationStore } from '@/lib/store/icu/tx-mutation'
import { formatOrders } from '@/lib/utils/utils'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import type { SelectedChart, SelectedIcuOrder } from '@/types/icu/chart'
import { RefObject, useCallback, useEffect, useState } from 'react'

type ChartTableProps = {
  chartData: SelectedChart
  preview?: boolean
  isExport?: boolean
  cellRef?: RefObject<HTMLTableRowElement>
  isTouchMove?: boolean
}

export default function ChartTable({
  chartData,
  preview,
  isExport,
  cellRef,
  isTouchMove,
}: ChartTableProps) {
  const {
    icu_chart_id,
    orders,
    patient: { hos_id, species },
    target_date,
  } = chartData
  const {
    basicHosData: {
      showOrderer,
      vetsListData,
      vitalRefRange,
      timeGuidelineData,
    },
  } = useBasicHosDataContext()
  const isCommandPressed = useIsCommandPressed()

  const [isSorting, setIsSorting] = useState(false)
  const [sortedOrders, setSortedOrders] = useState<SelectedIcuOrder[]>(orders)
  const [isDeleteOrdersDialogOpen, setIsDeleteOrdersDialogOpen] =
    useState(false)
  const [isAddTemplateDialogOpen, setIsAddTemplateDialogOpen] = useState(false)
  const [isOrderActionDialogOpen, setIsOrderActionDialogOpen] = useState(false)

  const [orderWidth, setOrderWidth] = useLocalStorage('orderWidth', 400)

  const {
    setOrderStep,
    reset,
    selectedTxPendingQueue,
    orderTimePendingQueue,
    selectedOrderPendingQueue,
    setSelectedOrderPendingQueue,
    setCopiedOrderPendingQueue,
    orderStep,
    isEditOrderMode,
  } = useIcuOrderStore()
  const isMobile = useIsMobile()

  useEffect(() => {
    if (!isSorting) {
      setSortedOrders(orders)
    }
  }, [isSorting, orders])

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

    // 오더 다중 선택 시
    if (!isCommandPressed && selectedOrderPendingQueue.length >= 1) {
      setIsOrderActionDialogOpen(true)
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
    selectedOrderPendingQueue.length,
  ])
  // ---------------------------------

  // ----- 다중 오더 삭제 -----
  // useShorcutKey({
  //   keys: ['backspace', 'delete'],
  //   이유는 모르겠지만 selectedOrderPendingQueue.length를 메모이제이션 하는 듯. 바뀌질 않아서 삭제 확인 다일로그가 안열림
  //   condition: selectedOrderPendingQueue.length > 0,
  //   callback: () => setIsDeleteOrdersDialogOpen(true),
  // })
  // ----- 다중 오더 삭제 -----

  return (
    <Table className="border">
      {/* 소팅버튼, 오더목록, 오더추가 버튼, 오더너비조절 버튼, 시간 */}
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
        <SortingOrderRows
          isMobile={isMobile}
          isSorting={isSorting}
          orderWidth={orderWidth}
          preview={preview}
          setSortedOrders={setSortedOrders}
          sortedOrders={sortedOrders}
          species={species}
        />
      ) : (
        <ChartTableBody
          reset={reset}
          selectedOrderPendingQueue={selectedOrderPendingQueue}
          setOrderStep={setOrderStep}
          isSorting={isSorting}
          sortedOrders={sortedOrders}
          preview={preview}
          vitalRefRange={vitalRefRange}
          showOrderer={showOrderer}
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
          species={species}
          hosId={hos_id}
          timeGuidelineData={timeGuidelineData}
        />
      )}

      {!isExport && (
        <>
          <TxUpsertDialog />
          <DeleteOrdersAlertDialog
            isDeleteOrdersDialogOpen={isDeleteOrdersDialogOpen}
            setIsDeleteOrdersDialogOpen={setIsDeleteOrdersDialogOpen}
            setIsOrderActionDialogOpen={setIsOrderActionDialogOpen}
            setSortedOrders={setSortedOrders}
          />
          <AddTemplateOrderDialog
            hosId={hos_id}
            targetDate={target_date}
            isAddTemplateDialogOpen={isAddTemplateDialogOpen}
            setIsAddTemplateDialogOpen={setIsAddTemplateDialogOpen}
          />
          <SelectedOrderActionDialog
            isOrderActionDialogOpen={isOrderActionDialogOpen}
            setIsOrderActionDialogOpen={setIsOrderActionDialogOpen}
            setIsDeleteOrdersDialogOpen={setIsDeleteOrdersDialogOpen}
            setIsAddTemplateDialogOpen={setIsAddTemplateDialogOpen}
            selectedOrderPendingQueue={selectedOrderPendingQueue}
            setSelectedOrderPendingQueue={setSelectedOrderPendingQueue}
            setCopiedOrderPendingQueue={setCopiedOrderPendingQueue}
          />
        </>
      )}
    </Table>
  )
}
