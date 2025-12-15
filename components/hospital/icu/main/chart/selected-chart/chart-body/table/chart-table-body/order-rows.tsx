import OrderRowCells from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-body/order-row-cells'
import OrderRowTitle from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-body/order-row-title'
import { TableRow } from '@/components/ui/table'
import useShorcutKey from '@/hooks/use-shortcut-key'
import { upsertOrder } from '@/lib/services/icu/chart/order-mutation'
import {
  OrderTimePendingQueue,
  useIcuOrderStore,
  type OrderStep,
} from '@/lib/store/icu/icu-order'
import { useIcuTxStore } from '@/lib/store/icu/icu-tx'
import { borderedOrderClassName } from '@/lib/utils/utils'
import type { VitalRefRange } from '@/types/adimin'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { useMemo } from 'react'
import { toast } from 'sonner'

type Props = {
  sortedOrders: SelectedIcuOrder[]
  isSorting: boolean
  showOrderer: boolean
  showTxUser: boolean
  selectedTxPendingQueue: OrderTimePendingQueue[]
  orderTimePendingQueueLength: number
  vitalRefRange: VitalRefRange[]
  species: string
  orderwidth: number
  icuChartId: string
  hosId: string
  setOrderStep: (orderStep: OrderStep) => void
  multiOrderPendingQueue: Partial<SelectedIcuOrder>[]
  resetOrderStore: () => void
  timeGuidelineData: number[]
  orderTimePendingQueue: OrderTimePendingQueue[]
}

export default function OrderRows({
  sortedOrders,
  isSorting,
  showOrderer,
  showTxUser,
  selectedTxPendingQueue,
  orderTimePendingQueueLength,
  vitalRefRange,
  species,
  orderwidth,
  icuChartId,
  hosId,
  setOrderStep,
  multiOrderPendingQueue,
  resetOrderStore,
  timeGuidelineData,
  orderTimePendingQueue,
}: Props) {
  const {
    setSelectedChartOrder,
    setMultiOrderPendingQueue,
    copiedOrderPendingQueue,
    setOrderTimePendingQueue,
    setSelectedTxPendingQueue,
  } = useIcuOrderStore()

  const {
    isMutationCanceled,
    setIsMutationCanceled,
    setTxStep,
    setTxLocalState,
  } = useIcuTxStore()

  useShorcutKey({
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

  const memoizedOrderRows = useMemo(() => {
    return sortedOrders.map((order, index) => {
      const isInOrderPendingQueue = multiOrderPendingQueue.some(
        (o) => o.icu_chart_order_id === order.icu_chart_order_id,
      )
      return (
        <TableRow
          className="relative divide-x"
          key={order.icu_chart_order_id}
          style={borderedOrderClassName(sortedOrders, order, index)}
        >
          <OrderRowTitle
            isInOrderPendingQueue={isInOrderPendingQueue}
            index={index}
            order={order}
            isSorting={isSorting}
            vitalRefRange={vitalRefRange}
            species={species}
            orderWidth={orderwidth}
            resetOrderStore={resetOrderStore}
            setSelectedOrderPendingQueue={setMultiOrderPendingQueue}
            setOrderStep={setOrderStep}
            setSelectedChartOrder={setSelectedChartOrder}
          />

          <OrderRowCells
            hosId={hosId}
            order={order}
            showOrderer={showOrderer}
            showTxUser={showTxUser}
            selectedTxPendingQueue={selectedTxPendingQueue}
            orderTimePendingQueueLength={orderTimePendingQueueLength}
            vitalRefRange={vitalRefRange}
            species={species}
            setOrderTimePendingQueue={setOrderTimePendingQueue}
            setSelectedTxPendingQueue={setSelectedTxPendingQueue}
            isMutationCanceled={isMutationCanceled}
            setIsMutationCanceled={setIsMutationCanceled}
            setTxStep={setTxStep}
            setTxLocalState={setTxLocalState}
            timeGuidelineData={timeGuidelineData}
            orderTimePendingQueue={orderTimePendingQueue}
          />
        </TableRow>
      )
    })
  }, [
    sortedOrders,
    multiOrderPendingQueue,
    isSorting,
    vitalRefRange,
    species,
    orderwidth,
    resetOrderStore,
    setMultiOrderPendingQueue,
    setOrderStep,
    setSelectedChartOrder,
    hosId,
    showOrderer,
    showTxUser,
    selectedTxPendingQueue,
    orderTimePendingQueueLength,
    setOrderTimePendingQueue,
    setSelectedTxPendingQueue,
    isMutationCanceled,
    setIsMutationCanceled,
    setTxStep,
    setTxLocalState,
    timeGuidelineData,
    orderTimePendingQueue,
  ])

  return <>{memoizedOrderRows}</>
}
