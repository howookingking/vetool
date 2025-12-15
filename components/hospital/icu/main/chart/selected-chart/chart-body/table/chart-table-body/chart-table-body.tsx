import OrderCreatorRow from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-body/order-creator/order-creator-row'
import OrderRows from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-body/order-rows'
import { TableBody } from '@/components/ui/table'
import useIsCommandPressed from '@/hooks/use-is-command-pressed'
import { upsertOrder } from '@/lib/services/icu/chart/order-mutation'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { useIcuTxStore } from '@/lib/store/icu/icu-tx'
import { formatOrders } from '@/lib/utils/utils'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import type { SelectedIcuChart, SelectedIcuOrder } from '@/types/icu/chart'
import { useEffect, type Dispatch, type SetStateAction } from 'react'
import { toast } from 'sonner'
import ChartTableDialogs from './chart-table-dialogs'

type Props = {
  sortedOrders: SelectedIcuOrder[]
  isSorting: boolean
  orderWidth: number
  icuChartId: SelectedIcuChart['icu_chart_id']
  setSortedOrders: Dispatch<SetStateAction<SelectedIcuOrder[]>>
  chartData: SelectedIcuChart
  hosId: string
}

export default function ChartTableBody({
  sortedOrders,
  isSorting,
  orderWidth,
  icuChartId,
  setSortedOrders,
  chartData,
  hosId,
}: Props) {
  const {
    icu_chart_id,
    orders,
    patient: { species },
    hos_id,
    main_vet,
  } = chartData

  const isCommandPressed = useIsCommandPressed()

  const {
    basicHosData: {
      showOrderer,
      showTxUser,
      vetList,
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
    multiOrderPendingQueue,
    setCopiedOrderPendingQueue,
    setMultiOrderPendingQueue,
  } = useIcuOrderStore()

  const { setTxStep } = useIcuTxStore()

  const handleUpsertOrderTimesWithoutOrderer = async () => {
    const formattedOrders = formatOrders(orderTimePendingQueue)

    for (const order of formattedOrders) {
      const currentOrder = orders.find(
        (o) => o.icu_chart_order_id === order.orderId,
      )
      if (!currentOrder) continue

      const updatedOrderTimes = currentOrder.icu_chart_order_time.map(
        (time, index) =>
          order.orderTimes.includes(index)
            ? time === '0'
              ? vetList[0].name
              : '0'
            : time,
      )

      await upsertOrder(
        hos_id,
        icu_chart_id,
        order.orderId,
        updatedOrderTimes,
        {
          icu_chart_order_name: currentOrder.icu_chart_order_name,
          icu_chart_order_comment: currentOrder.icu_chart_order_comment,
          icu_chart_order_type: currentOrder.icu_chart_order_type,
          icu_chart_order_priority: currentOrder.id,
        },
      )
    }

    toast.success('오더시간을 변경하였습니다')

    resetOrderStore()
  }

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
        multiOrderPendingQueue={multiOrderPendingQueue}
        setOrderStep={setOrderStep}
        sortedOrders={sortedOrders}
        isSorting={isSorting}
        vitalRefRange={vitalRefRange}
        species={species}
        showOrderer={showOrderer}
        showTxUser={showTxUser}
        selectedTxPendingQueue={selectedTxPendingQueue}
        orderTimePendingQueueLength={orderTimePendingQueue.length}
        orderTimePendingQueue={orderTimePendingQueue}
        orderwidth={orderWidth}
        icuChartId={icuChartId}
        hosId={hos_id}
        timeGuidelineData={timeGuidelineData}
        resetOrderStore={resetOrderStore}
      />

      <OrderCreatorRow
        icuChartId={icuChartId}
        setSortedOrders={setSortedOrders}
        sortedOrders={sortedOrders}
        orderColorsData={orderColorsData}
        weight={chartData.weight}
        hosId={hos_id}
      />

      <ChartTableDialogs
        icuChartId={icuChartId}
        setSortedOrders={setSortedOrders}
        orders={orders}
        showOrderer={showOrderer}
        setOrderStep={setOrderStep}
        resetOrderStore={resetOrderStore}
        mainVet={main_vet}
        orderColorsData={orderColorsData}
        showTxUser={showTxUser}
        isCommandPressed={isCommandPressed}
        multiOrderPendingQueue={multiOrderPendingQueue}
        hosId={hosId}
        setCopiedOrderPendingQueue={setCopiedOrderPendingQueue}
        setMultiOrderPendingQueue={setMultiOrderPendingQueue}
      />
    </TableBody>
  )
}
