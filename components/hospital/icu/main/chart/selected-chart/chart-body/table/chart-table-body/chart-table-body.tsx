import { TableBody, TableCell, TableRow } from '@/components/ui/table'
import {
  type OrderStep,
  OrderTimePendingQueue,
} from '@/lib/store/icu/icu-order'
import type { VitalRefRange } from '@/types/adimin'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { Dispatch, RefObject, SetStateAction } from 'react'
import OrderRows from './order-rows'
import QuickOrderInsertInput from './quick-order-insert-input'

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
  setOrderStep: (orderStep: 'closed' | 'upsert' | 'selectOrderer') => void
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
            <QuickOrderInsertInput
              icuChartId={icuChartId}
              setSortedOrders={setSortedOrders}
            />
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  )
}
