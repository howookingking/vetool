import OrderRowTitle from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-body/order-row-title'
import SortableOrderWrapper from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/sortable-order-wrapper'
import { TableRow } from '@/components/ui/table'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import type { Dispatch, SetStateAction } from 'react'
import type { Sortable } from 'react-sortablejs'
import type { OrderWidth } from '../chart-table-header/order-width-button'

type Props = {
  isSorting: boolean
  sortedOrders: SelectedIcuOrder[]
  setSortedOrders: Dispatch<SetStateAction<SelectedIcuOrder[]>>
  orderWidth: OrderWidth
  species: string
  onOrderMove: (event: Sortable.SortableEvent) => void
}

export default function SortingOrderRows({
  isSorting,
  sortedOrders,
  setSortedOrders,
  orderWidth,
  onOrderMove,
  species,
}: Props) {
  return (
    <SortableOrderWrapper
      orders={sortedOrders}
      onOrdersChange={setSortedOrders}
      onSortEnd={onOrderMove}
    >
      {sortedOrders.map((order, index) => (
        <TableRow className="relative divide-x" key={order.order_id}>
          <OrderRowTitle
            index={index}
            order={order}
            isSorting={isSorting}
            orderWidth={orderWidth}
            species={species}
          />
        </TableRow>
      ))}
    </SortableOrderWrapper>
  )
}
