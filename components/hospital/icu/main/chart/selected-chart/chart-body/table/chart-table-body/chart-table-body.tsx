import OrderCreator from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-body/order-creator'
import OrderRows from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-body/order-rows'
import { Separator } from '@/components/ui/separator'
import { TableBody, TableCell, TableRow } from '@/components/ui/table'
import {
  type OrderStep,
  OrderTimePendingQueue,
} from '@/lib/store/icu/icu-order'
import { type VitalRefRange } from '@/types/adimin'
import { type SelectedIcuOrder } from '@/types/icu/chart'
import { type Dispatch, type RefObject, type SetStateAction } from 'react'

type ChartTableBodyProps = {
  selectedOrderPendingQueue: Partial<SelectedIcuOrder>[]
  sortedOrders: SelectedIcuOrder[]
  isSorting: boolean
  preview?: boolean
  vitalRefRange: VitalRefRange[]
  showOrderer: boolean
  showTxUser: boolean
  selectedTxPendingQueue: OrderTimePendingQueue[]
  orderStep: OrderStep
  orderTimePendingQueue: OrderTimePendingQueue[]
  orderWidth: number
  isMobile: boolean
  isTouchMove?: boolean
  isExport?: boolean
  icuChartId: string
  setSortedOrders: Dispatch<SetStateAction<SelectedIcuOrder[]>>
  cellRef?: RefObject<HTMLTableRowElement>
  species: string
  hosId: string
  setOrderStep: (orderStep: OrderStep) => void
  reset: () => void
  timeGuidelineData: number[]
}

export default function ChartTableBody({
  selectedOrderPendingQueue,
  sortedOrders,
  isSorting,
  preview,
  vitalRefRange,
  showOrderer,
  showTxUser,
  selectedTxPendingQueue,
  orderStep,
  orderTimePendingQueue,
  orderWidth,
  isMobile,
  isTouchMove,
  isExport,
  icuChartId,
  setSortedOrders,
  cellRef,
  species,
  hosId,
  setOrderStep,
  reset,
  timeGuidelineData,
}: ChartTableBodyProps) {
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
        hosId={hosId}
        timeGuidelineData={timeGuidelineData}
      />

      {!isExport && !preview && (
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
      )}
    </TableBody>
  )
}
