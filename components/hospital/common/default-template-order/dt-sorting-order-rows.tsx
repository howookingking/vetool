import SortableOrderWrapper from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/sortable-order-wrapper'
import { TableRow } from '@/components/ui/table'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import type { Dispatch, SetStateAction } from 'react'
import type { Sortable } from 'react-sortablejs'
import type { OrderWidth } from '../../icu/main/chart/selected-chart/chart-body/table/chart-table-header/order-width-button'
import DtOrderRowTitle from './dt-order-row-title'

type Props = {
  isSorting: boolean
  orderWidth: OrderWidth
  sortedOrders: SelectedIcuOrder[]
  setSortedOrders: Dispatch<SetStateAction<SelectedIcuOrder[]>>
  onOrderMove: (event: Sortable.SortableEvent) => void
}

export default function DtSortingOrderRows({
  sortedOrders,
  setSortedOrders,
  isSorting,
  orderWidth,
  onOrderMove,
}: Props) {
  return (
    <SortableOrderWrapper
      orders={sortedOrders}
      onOrdersChange={setSortedOrders}
      onSortEnd={onOrderMove}
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
