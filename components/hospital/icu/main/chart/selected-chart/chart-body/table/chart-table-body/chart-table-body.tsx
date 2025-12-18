import OrderCreatorRow from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-body/order-creator/order-creator-row'
import OrderRows from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-body/order-rows'
import { TableBody } from '@/components/ui/table'
import useIsCommandPressed from '@/hooks/use-is-command-pressed'
import useShortcutKey from '@/hooks/use-shortcut-key'
import { upsertOrder } from '@/lib/services/icu/chart/order-mutation'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { useIcuTxStore } from '@/lib/store/icu/icu-tx'
import { formatOrders } from '@/lib/utils/utils'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import type { SelectedIcuChart, SelectedIcuOrder } from '@/types/icu/chart'
import { useEffect, type Dispatch, type SetStateAction } from 'react'
import { toast } from 'sonner'
import type { OrderWidth } from '../chart-table-header/order-width-button'
import ChartTableDialogs from './chart-table-dialogs'

type Props = {
  sortedOrders: SelectedIcuOrder[]
  isSorting: boolean
  orderWidth: OrderWidth
  icuChartId: SelectedIcuChart['icu_chart_id']
  setSortedOrders: Dispatch<SetStateAction<SelectedIcuOrder[]>>
  chartData: SelectedIcuChart
  hosId: string
  targetDate: string
}

export default function ChartTableBody({
  sortedOrders,
  isSorting,
  orderWidth,
  icuChartId,
  setSortedOrders,
  chartData,
  hosId,
  targetDate,
}: Props) {
  const {
    icu_chart_id,
    orders,
    patient: { species },
    main_vet,
  } = chartData

  const isCommandPressed = useIsCommandPressed()

  const {
    basicHosData: { showOrderer, vetList },
  } = useBasicHosDataContext()

  const {
    setOrderStep,
    reset: resetOrderStore,
    orderTimePendingQueue,
    selectedTxPendingQueue,
    copiedOrderPendingQueue,
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

      await upsertOrder(hosId, icu_chart_id, order.orderId, updatedOrderTimes, {
        icu_chart_order_name: currentOrder.icu_chart_order_name,
        icu_chart_order_comment: currentOrder.icu_chart_order_comment,
        icu_chart_order_type: currentOrder.icu_chart_order_type,
        icu_chart_order_priority: currentOrder.id,
      })
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

  // --- 복사한 다중 오더 붙여넣기 ---
  useShortcutKey({
    key: 'v',
    condition: copiedOrderPendingQueue.length > 0,
    callback: showOrderer
      ? () => setOrderStep('selectOrderer')
      : () => handleUpsertOrderWithoutOrderer(),
  })

  const handleUpsertOrderWithoutOrderer = async () => {
    for (const order of copiedOrderPendingQueue) {
      await upsertOrder(
        hosId,
        icuChartId,
        undefined,
        order.icu_chart_order_time!,
        {
          icu_chart_order_name: order.icu_chart_order_name!,
          icu_chart_order_comment: order.icu_chart_order_comment!,
          icu_chart_order_type: order.icu_chart_order_type!,
          icu_chart_order_priority: order.id!,
          is_bordered: order.is_bordered!,
        },
      )
    }

    toast.success('오더를 붙여넣었습니다')

    resetOrderStore()
  }
  // --- 복사한 다중 오더 붙여넣기 ---

  return (
    <TableBody>
      <OrderRows
        hosId={hosId}
        isSorting={isSorting}
        sortedOrders={sortedOrders}
        species={species}
        orderwidth={orderWidth}
        targetDate={targetDate}
      />

      <OrderCreatorRow
        icuChartId={icuChartId}
        setSortedOrders={setSortedOrders}
        sortedOrders={sortedOrders}
        weight={chartData.weight}
        hosId={hosId}
      />

      <ChartTableDialogs
        hosId={hosId}
        icuChartId={icuChartId}
        setSortedOrders={setSortedOrders}
        orders={orders}
        mainVet={main_vet}
        isCommandPressed={isCommandPressed}
      />
    </TableBody>
  )
}
