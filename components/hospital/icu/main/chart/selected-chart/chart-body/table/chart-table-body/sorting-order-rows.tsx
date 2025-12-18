import OrderRowTitle from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-body/order-row-title'
import SortableOrderWrapper from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/sortable-order-wrapper'
import { TableRow } from '@/components/ui/table'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import type { Dispatch, SetStateAction } from 'react'
import type { Sortable } from 'react-sortablejs'
import type { OrderWidth } from '../chart-table-header/order-width-button'

type Props = {
  isSorting: true
  sortedOrders: SelectedIcuOrder[]
  setSortedOrders: Dispatch<SetStateAction<SelectedIcuOrder[]>>
  orderWidth: OrderWidth
  onOrderMove: (event: Sortable.SortableEvent) => void
  targetDate: string
}

export default function SortingOrderRows({
  isSorting,
  sortedOrders,
  setSortedOrders,
  orderWidth,
  onOrderMove,
  targetDate,
}: Props) {
  return (
    <SortableOrderWrapper
      orders={sortedOrders}
      onOrdersChange={setSortedOrders}
      onSortEnd={onOrderMove}
    >
      {sortedOrders.map((order, index) => (
        <TableRow key={order.icu_chart_order_id}>
          <OrderRowTitle
            index={index}
            order={order}
            isSorting={isSorting}
            orderWidth={orderWidth}
            targetDate={targetDate}
          />
        </TableRow>
      ))}
    </SortableOrderWrapper>
  )
}
