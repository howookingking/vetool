'use client'

import ChartTableBody from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-body/chart-table-body'
import SortingOrderRows from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-body/sorting-order-rows'
import ChartTableHeader from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-header/chart-table-header'
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
import { type SelectedChart, type SelectedIcuOrder } from '@/types/icu/chart'
import { type RefObject, useCallback, useEffect, useState } from 'react'
import MultiSelectOrderDialog from './order/multil-select-order/multi-select-order-dialog'
import OrderDialog from './order/order-dialog'

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
  const { icu_chart_id, orders, patient } = chartData
  const { hos_id } = patient

  const {
    basicHosData: {
      showOrderer,
      showTxUser,
      vetsListData,
      vitalRefRange,
      timeGuidelineData,
      orderColorsData,
    },
  } = useBasicHosDataContext()
  const isCommandPressed = useIsCommandPressed()
  const [orderWidth, setOrderWidth] = useLocalStorage('orderWidth', 400)
  const {
    setOrderStep,
    reset,
    selectedTxPendingQueue,
    orderTimePendingQueue,
    selectedOrderPendingQueue,
    orderStep,
    selectedChartOrder,
  } = useIcuOrderStore()
  const isMobile = useIsMobile()
  const { txStep, setTxStep } = useTxMutationStore()

  const [isSorting, setIsSorting] = useState(false)
  const [sortedOrders, setSortedOrders] = useState<SelectedIcuOrder[]>(orders)
  useState(false)
  const [isMultiSelectOrderDialogOpen, setIsMultiSelectOrderDialogOpen] =
    useState(false)

  useEffect(() => {
    if (!isSorting) {
      setSortedOrders(orders)
    }
    // eslint-disable-next-line
  }, [orders])

  useEffect(() => {
    if (isSorting) {
      setSortedOrders((prev) => prev)
    }
  }, [isSorting, sortedOrders])

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
  useEffect(() => {
    if (!isCommandPressed) {
      if (orderTimePendingQueue.length >= 1) {
        showOrderer
          ? setOrderStep('selectOrderer')
          : handleUpsertOrderTimesWithoutOrderer()
      }

      if (selectedTxPendingQueue.length >= 1 && txStep === 'closed') {
        setTxStep('detailInsert')
      }

      if (selectedOrderPendingQueue.length >= 1) {
        setIsMultiSelectOrderDialogOpen(true)
      }
    }
  }, [
    handleUpsertOrderTimesWithoutOrderer,
    isCommandPressed,
    orderTimePendingQueue.length,
    selectedTxPendingQueue.length,
    setOrderStep,
    setTxStep,
    showOrderer,
    txStep,
    selectedOrderPendingQueue.length,
  ])
  // ---------------------------------

  return (
    <Table className="border">
      {/* 소팅버튼, 오더목록, 오더너비조절 버튼, 시간 */}
      <ChartTableHeader
        chartData={chartData}
        isSorting={isSorting}
        setIsSorting={setIsSorting}
        preview={preview}
        sortedOrders={sortedOrders}
        setOrderStep={setOrderStep}
        isExport={isExport}
        setSortedOrders={setSortedOrders}
        orderWidth={orderWidth}
        setOrderWidth={setOrderWidth}
        isTouchMove={isTouchMove}
        isMobile={isMobile}
        chartId={icu_chart_id}
      />

      {isSorting ? (
        <SortingOrderRows
          isMobile={isMobile}
          isSorting={isSorting}
          orderWidth={orderWidth}
          preview={preview}
          setSortedOrders={setSortedOrders}
          sortedOrders={sortedOrders}
          species={patient.species}
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
          showTxUser={showTxUser}
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
          species={patient.species}
          hosId={patient.hos_id}
          timeGuidelineData={timeGuidelineData}
        />
      )}

      {!isExport && (
        <>
          {/* 처치관련 : 처치 상세 입력, 처치자 입력 */}
          <TxUpsertDialog showTxUser={showTxUser} />

          {/* 다중 오더 선택 후 작업 : 오더 복사, 템플릿저장, 테두리 변경, 오더 삭제 */}
          <MultiSelectOrderDialog
            isMultiSelectOrderDialogOpen={isMultiSelectOrderDialogOpen}
            setIsMultiSelectOrderDialogOpen={setIsMultiSelectOrderDialogOpen}
            setSortedOrders={setSortedOrders}
          />

          {/* 템플릿오더 붙여넣기**, 오더자선택, 오더수정 */}
          {/* **템플릿오더 붙여넣기 = 차트에 템플릿오더를 넣음, 템플릿오더 추가 = 템플릿 db 추가,  */}
          <OrderDialog
            icuChartId={icu_chart_id}
            orders={orders}
            showOrderer={showOrderer}
            orderStep={orderStep}
            reset={reset}
            setOrderStep={setOrderStep}
            setSortedOrders={setSortedOrders}
            mainVetName={chartData.main_vet.name}
            selectedChartOrder={selectedChartOrder}
            orderColorsData={orderColorsData}
          />
        </>
      )}
    </Table>
  )
}
