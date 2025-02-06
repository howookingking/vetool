import OrderCreator from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-body/order-creator'
import OrderRows from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-body/order-rows'
import { Separator } from '@/components/ui/separator'
import { TableBody, TableCell, TableRow } from '@/components/ui/table'
import { toast } from '@/components/ui/use-toast'
import useIsCommandPressed from '@/hooks/use-is-command-pressed'
import { upsertOrder } from '@/lib/services/icu/chart/order-mutation'
import {
  type OrderStep,
  OrderTimePendingQueue,
  useIcuOrderStore,
} from '@/lib/store/icu/icu-order'
import { useTxMutationStore } from '@/lib/store/icu/tx-mutation'
import { formatOrders } from '@/lib/utils/utils'
import { type VitalRefRange } from '@/types/adimin'
import { SelectedChart, Vet, type SelectedIcuOrder } from '@/types/icu/chart'
import {
  useEffect,
  useState,
  type Dispatch,
  type RefObject,
  type SetStateAction,
} from 'react'
import TxUpsertDialog from '../tx/tx-upsert-dialog'
import MultiSelectOrderDialog from '../order/multil-select-order/multi-select-order-dialog'
import OrderDialog from '../order/order-dialog'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'

type ChartTableBodyProps = {
  sortedOrders: SelectedIcuOrder[]
  isSorting: boolean
  preview?: boolean
  orderWidth: number
  isMobile: boolean
  isTouchMove?: boolean
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
  isMobile,
  isTouchMove,
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
  } = chartData

  const {
    setOrderStep,
    reset,
    selectedTxPendingQueue,
    orderTimePendingQueue,
    selectedOrderPendingQueue,
    orderStep,
    selectedChartOrder,
  } = useIcuOrderStore()

  const isCommandPressed = useIsCommandPressed()

  const [isMultiSelectOrderDialogOpen, setIsMultiSelectOrderDialogOpen] =
    useState(false)

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
    reset()
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
        setIsMultiSelectOrderDialogOpen(true)
      }
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [isCommandPressed])

  return (
    <TableBody>
      <OrderRows
        reset={reset}
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
        isMobile={isMobile}
        isTouchMove={isTouchMove}
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

            <TableCell className="relative">
              <div className="absolute bottom-3 left-2 hidden items-center gap-2 whitespace-nowrap text-muted-foreground md:flex">
                <div>
                  처치칸을 CTRL + 우클릭하여{' '}
                  <span className="mx-1 bg-rose-400/10 p-1">형광펜</span>
                  칠을 할 수 있습니다
                </div>

                <Separator orientation="vertical" className="h-4" />

                <div>
                  CTRL + 오더 또는 처치칸을 클릭하면 다중으로 선택할 수 있습니다
                </div>
              </div>
            </TableCell>
          </TableRow>
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
        </>
      )}
    </TableBody>
  )
}
