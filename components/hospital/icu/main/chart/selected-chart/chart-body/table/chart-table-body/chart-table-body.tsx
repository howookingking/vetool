import OrderCreator from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-body/order-creator'
import OrderRows from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-body/order-rows'
import { Separator } from '@/components/ui/separator'
import { TableBody, TableCell, TableRow } from '@/components/ui/table'
import { toast } from '@/components/ui/use-toast'
import useIsCommandPressed from '@/hooks/use-is-command-pressed'
import { upsertOrder } from '@/lib/services/icu/chart/order-mutation'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { useTxMutationStore } from '@/lib/store/icu/tx-mutation'
import { formatOrders } from '@/lib/utils/utils'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import { SelectedChart, type SelectedIcuOrder } from '@/types/icu/chart'
import {
  useEffect,
  useState,
  type Dispatch,
  type RefObject,
  type SetStateAction,
} from 'react'
import ChartTableDialogs from './chart-table-dialogs/chart-table-dialogs'
import UserKeyGuideMessage from './user-key-guide-message'

type ChartTableBodyProps = {
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
}: ChartTableBodyProps) {
  const {
    icu_chart_id,
    orders,
    patient: { species },
    hos_id,
    main_vet,
  } = chartData

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
  const {
    orderStep,
    setOrderStep,
    reset: resetOrderStore,
    selectedChartOrder,
    orderTimePendingQueue,
    selectedTxPendingQueue,
    selectedOrderPendingQueue,
  } = useIcuOrderStore()

  console.log(selectedTxPendingQueue)

  const [isMultiOrderDialogOpen, setIsMultiOrderDialogOpen] = useState(false)

  const { txStep, setTxStep } = useTxMutationStore()

  const handleUpsertOrderTimesWithoutOrderer = async () => {
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
    resetOrderStore()
  }

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
        setIsMultiOrderDialogOpen(true)
      }
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [isCommandPressed])

  return (
    <TableBody>
      <OrderRows
        reset={resetOrderStore}
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
        orderStep={orderStep}
        orderTimePendingQueueLength={orderTimePendingQueue.length}
        orderwidth={orderWidth}
        cellRef={cellRef}
        icuChartId={icuChartId}
        hosId={hos_id}
        timeGuidelineData={timeGuidelineData}
      />

      {!isExport && !preview && (
        <>
          <TableRow className="hover:bg-transparent">
            <TableCell className="p-0">
              <OrderCreator
                icuChartId={icuChartId}
                setSortedOrders={setSortedOrders}
                sortedOrders={sortedOrders}
              />
            </TableCell>

            <UserKeyGuideMessage />
          </TableRow>

          <ChartTableDialogs
            isMultiOrderDialogOpen={isMultiOrderDialogOpen}
            setIsMultiOrderDialogOpen={setIsMultiOrderDialogOpen}
            icuChartId={icuChartId}
            setSortedOrders={setSortedOrders}
            orders={orders}
            showOrderer={showOrderer}
            orderStep={orderStep}
            setOrderStep={setOrderStep}
            reset={resetOrderStore}
            selectedChartOrder={selectedChartOrder}
            mainVetName={main_vet}
            orderColorsData={orderColorsData}
            showTxUser={showTxUser}
          />
        </>
      )}
    </TableBody>
  )
}
