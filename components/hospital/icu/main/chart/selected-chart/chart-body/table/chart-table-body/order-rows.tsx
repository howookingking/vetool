import OrderRowCells from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-body/order-row-cells'
import OrderRowTitle from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-body/order-row-title'
import { TableRow } from '@/components/ui/table'
import { OrderTimePendingQueue } from '@/lib/store/icu/icu-order'
import { cn } from '@/lib/utils/utils'
import type { VitalRefRange } from '@/types/adimin'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { RefObject } from 'react'

type CellsRowTitlesProps = {
  sortedOrders: SelectedIcuOrder[]
  isSorting: boolean
  preview?: boolean
  showOrderer: boolean
  hoveredColumn: number | null
  handleColumnHover: (columnIndex: number) => void
  handleColumnLeave: () => void
  selectedTxPendingQueue: OrderTimePendingQueue[]
  orderStep: 'closed' | 'upsert' | 'selectOrderer' | 'multipleEdit'
  orderTimePendingQueueLength: number
  vitalRefRange: VitalRefRange[]
  species: string
  orderwidth: number
  isMobile: boolean
  cellRef?: RefObject<HTMLTableRowElement>
  isTouchMove?: boolean
}

export default function OrderRows({
  sortedOrders,
  isSorting,
  preview,
  showOrderer,
  hoveredColumn,
  handleColumnHover,
  handleColumnLeave,
  selectedTxPendingQueue,
  orderStep,
  orderTimePendingQueueLength,
  vitalRefRange,
  species,
  orderwidth,
  cellRef,
  isTouchMove,
  isMobile,
}: CellsRowTitlesProps) {
  return sortedOrders.map((order, index) => (
    <TableRow
      className={cn(
        'relative w-full divide-x',
        !isSorting && 'hover:bg-muted/50',
      )}
      key={order.order_id}
      ref={cellRef}
    >
      <OrderRowTitle
        index={index}
        order={order}
        preview={preview}
        isSorting={isSorting}
        vitalRefRange={vitalRefRange}
        species={species}
        orderWidth={orderwidth}
        isTouchMove={isTouchMove}
        isMobile={isMobile}
      />
      {!isSorting && (
        <OrderRowCells
          preview={preview}
          order={order}
          showOrderer={showOrderer}
          hoveredColumn={hoveredColumn}
          handleColumnHover={handleColumnHover}
          handleColumnLeave={handleColumnLeave}
          selectedTxPendingQueue={selectedTxPendingQueue}
          orderStep={orderStep}
          orderTimePendingQueueLength={orderTimePendingQueueLength}
          vitalRefRange={vitalRefRange}
          species={species}
        />
      )}
    </TableRow>
  ))
}
