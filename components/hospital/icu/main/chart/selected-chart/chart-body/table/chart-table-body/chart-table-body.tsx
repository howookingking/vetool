import OrderCreatorRow from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-body/order-creator/order-creator-row'
import OrderRows from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-body/order-rows'
import { TableBody } from '@/components/ui/table'
import { toast } from '@/components/ui/use-toast'
import useIsCommandPressed from '@/hooks/use-is-command-pressed'
import { upsertOrder } from '@/lib/services/icu/chart/order-mutation'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { useIcuTxStore } from '@/lib/store/icu/icu-tx'
import { formatOrders } from '@/lib/utils/utils'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import type { SelectedChart, SelectedIcuOrder } from '@/types/icu/chart'
import {
  useEffect,
  type Dispatch,
  type RefObject,
  type SetStateAction,
} from 'react'
import ChartTableDialogs from './chart-table-dialogs'

type Props = {
  sortedOrders: SelectedIcuOrder[]
  isSorting: boolean
  preview?: boolean
  orderWidth: number
  isExport?: boolean
  icuChartId: string
  setSortedOrders: Dispatch<SetStateAction<SelectedIcuOrder[]>>
  cellRef?: RefObject<HTMLTableRowElement>
  chartData: SelectedChart
}

export default function ChartTableBody({
  sortedOrders,
  isSorting,
  preview,
  orderWidth,
  isExport,
  icuChartId,
  setSortedOrders,
  cellRef,
  chartData,
}: Props) {
  const {
    icu_chart_id,
    orders,
    patient: { species },
    hos_id,
    main_vet: { name },
  } = chartData

  const isCommandPressed = useIsCommandPressed()
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
  const {
    setOrderStep,
    reset: resetOrderStore,
    orderTimePendingQueue,
    selectedTxPendingQueue,
    selectedOrderPendingQueue,
  } = useIcuOrderStore()
  const { setTxStep } = useIcuTxStore()

  const handleUpsertOrderTimesWithoutOrderer = async () => {
    const formattedOrders = formatOrders(orderTimePendingQueue)

    for (const order of formattedOrders) {
      const currentOrder = orders.find((o) => o.order_id === order.orderId)
      if (!currentOrder) continue

      const updatedOrderTimes = currentOrder.order_times.map((time, index) =>
        order.orderTimes.includes(index)
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
    resetOrderStore()
  }

  // 고정, 멀티오더는 멀티오더 컴포넌트로 보냄
  useEffect(() => {
    if (!isCommandPressed) {
      if (orderTimePendingQueue.length >= 1) {
        showOrderer
          ? setOrderStep('selectOrderer')
          : handleUpsertOrderTimesWithoutOrderer()
      }

      if (selectedTxPendingQueue.length >= 1) {
        setTxStep('detailInsert')
      }
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [isCommandPressed])

  return (
    <TableBody>
      <OrderRows
        selectedOrderPendingQueue={selectedOrderPendingQueue}
        setOrderStep={setOrderStep}
        sortedOrders={sortedOrders}
        isSorting={isSorting}
        preview={preview}
        vitalRefRange={vitalRefRange}
        species={species}
        showOrderer={showOrderer}
        showTxUser={showTxUser}
        selectedTxPendingQueue={selectedTxPendingQueue}
        orderTimePendingQueueLength={orderTimePendingQueue.length}
        orderTimePendingQueue={orderTimePendingQueue}
        orderwidth={orderWidth}
        cellRef={cellRef}
        icuChartId={icuChartId}
        hosId={hos_id}
        timeGuidelineData={timeGuidelineData}
        resetOrderStore={resetOrderStore}
      />

      {!isExport && !preview && (
        <>
          <OrderCreatorRow
            icuChartId={icuChartId}
            setSortedOrders={setSortedOrders}
            sortedOrders={sortedOrders}
            orderColorsData={orderColorsData}
            weight={chartData.weight}
          />

          <ChartTableDialogs
            icuChartId={icuChartId}
            setSortedOrders={setSortedOrders}
            orders={orders}
            showOrderer={showOrderer}
            setOrderStep={setOrderStep}
            resetOrderStore={resetOrderStore}
            mainVetName={name}
            orderColorsData={orderColorsData}
            showTxUser={showTxUser}
            isCommandPressed={isCommandPressed}
            selectedOrderPendingQueue={selectedOrderPendingQueue}
          />
        </>
      )}
    </TableBody>
  )
}
