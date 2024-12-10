import OrderRowCells from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-body/order-row-cells'
import OrderRowTitle from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-body/order-row-title'
import { TableRow } from '@/components/ui/table'
import { OrderTimePendingQueue } from '@/lib/store/icu/icu-order'
import type { VitalRefRange } from '@/types/adimin'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { RefObject } from 'react'

type CellsRowTitlesProps = {
  // hoveredColumn: number | null
  // handleColumnHover: (columnIndex: number) => void
  // handleColumnLeave: () => void
  sortedOrders: SelectedIcuOrder[]
  isSorting: boolean
  preview?: boolean
  showOrderer: boolean
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
      className="relative w-full divide-x"
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
