import OrderRowTitle from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-body/order-row-title'
import SortableOrderWrapper from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/sortable-order-wrapper'
import { TableRow } from '@/components/ui/table'
import { type SelectedIcuOrder } from '@/types/icu/chart'
import { type Dispatch, type SetStateAction } from 'react'
import { type Sortable } from 'react-sortablejs'

type SortingRowsProps = {
  sortedOrders: SelectedIcuOrder[]
  setSortedOrders: Dispatch<SetStateAction<SelectedIcuOrder[]>>
  preview?: boolean
  isSorting: boolean
  orderWidth: number
  species: string
}

export default function SortingOrderRows({
  sortedOrders,
  setSortedOrders,
  preview,
  isSorting,
  orderWidth,
  species,
}: SortingRowsProps) {
  const handleReorder = (event: Sortable.SortableEvent) => {
    const newOrders = [...sortedOrders]
    const [movedOrder] = newOrders.splice(event.oldIndex as number, 1)
    newOrders.splice(event.newIndex as number, 0, movedOrder)
    setSortedOrders(newOrders)
  }

  return (
    <SortableOrderWrapper
      orders={sortedOrders}
      onOrdersChange={setSortedOrders}
      onSortEnd={handleReorder}
    >
      {sortedOrders.map((order, index) => (
        <TableRow className="relative divide-x" key={order.order_id}>
          <OrderRowTitle
            index={index}
            order={order}
            preview={preview}
            isSorting={isSorting}
            orderWidth={orderWidth}
            species={species}
          />
        </TableRow>
      ))}
    </SortableOrderWrapper>
  )
}
