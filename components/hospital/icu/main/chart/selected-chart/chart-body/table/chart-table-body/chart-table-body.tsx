import { TableBody, TableCell, TableRow } from '@/components/ui/table'
import { OrderTimePendingQueue } from '@/lib/store/icu/icu-order'
import type { VitalRefRange } from '@/types/adimin'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { Dispatch, RefObject, SetStateAction } from 'react'
import OrderRows from './order-rows'
import QuickOrderInsertInput from './quick-order-insert-input'

type ChartTableBodyProps = {
  sortedOrders: SelectedIcuOrder[]
  isSorting: boolean
  preview?: boolean
  vitalRefRange: VitalRefRange[]
  showOrderer: boolean
  hoveredColumn: number | null
  handleColumnHover: (columnIndex: number) => void
  handleColumnLeave: () => void
  selectedTxPendingQueue: OrderTimePendingQueue[]
  orderStep: 'closed' | 'upsert' | 'selectOrderer' | 'multipleEdit'
  orderTimePendingQueue: OrderTimePendingQueue[]
  orderWidth: number
  isMobile: boolean
  isTouchMove?: boolean
  isExport?: boolean
  icuChartId: string
  setSortedOrders: Dispatch<SetStateAction<SelectedIcuOrder[]>>
  cellRef?: RefObject<HTMLTableRowElement>
  species: string
}

export default function ChartTableBody({
  sortedOrders,
  isSorting,
  preview,
  vitalRefRange,
  showOrderer,
  hoveredColumn,
  handleColumnHover,
  handleColumnLeave,
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
}: ChartTableBodyProps) {
  return (
    <TableBody>
      <OrderRows
        sortedOrders={sortedOrders}
        isSorting={isSorting}
        preview={preview}
        vitalRefRange={vitalRefRange}
        species={species}
        showOrderer={showOrderer}
        hoveredColumn={hoveredColumn}
        handleColumnHover={handleColumnHover}
        handleColumnLeave={handleColumnLeave}
        selectedTxPendingQueue={selectedTxPendingQueue}
        orderStep={orderStep}
        orderTimePendingQueueLength={orderTimePendingQueue.length}
        orderwidth={orderWidth}
        cellRef={cellRef}
        isMobile={isMobile}
        isTouchMove={isTouchMove}
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
