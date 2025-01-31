import SortableOrderWrapper from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/sortable-order-wrapper'
import { TableRow } from '@/components/ui/table'
import { type SelectedIcuOrder } from '@/types/icu/chart'
import { type Dispatch, type SetStateAction } from 'react'
import { type Sortable } from 'react-sortablejs'
import DtOrderRowTitle from './dt-order-row-title'

type SortingRowsProps = {
  sortedOrders: SelectedIcuOrder[]
  setSortedOrders: Dispatch<SetStateAction<SelectedIcuOrder[]>>
  isSorting: boolean
  orderWidth: number
}

export default function DtSortingOrderRows({
  sortedOrders,
  setSortedOrders,
  isSorting,
  orderWidth,
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
          <DtOrderRowTitle
            index={index}
            order={order}
            isSorting={isSorting}
            orderWidth={orderWidth}
          />
        </TableRow>
      ))}
    </SortableOrderWrapper>
  )
}
