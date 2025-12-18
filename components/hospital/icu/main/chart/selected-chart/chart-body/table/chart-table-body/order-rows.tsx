import OrderRowCells from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-body/order-row-cells'
import OrderRowTitle from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-body/order-row-title'
import { TableRow } from '@/components/ui/table'
import { borderedOrderClassName } from '@/lib/utils/utils'
import type { SelectedIcuOrder } from '@/types/icu/chart'

type Props = {
  hosId: string
  isSorting: boolean
  sortedOrders: SelectedIcuOrder[]
  species: string
  orderwidth: number
  targetDate: string
}

export default function OrderRows({
  sortedOrders,
  isSorting,
  species,
  orderwidth,
  hosId,
  targetDate,
}: Props) {
  return sortedOrders.map((order, index) => (
    <TableRow
      className="relative divide-x"
      key={order.icu_chart_order_id}
      style={borderedOrderClassName(sortedOrders, order, index)}
    >
      <OrderRowTitle
        index={index}
        order={order}
        isSorting={isSorting}
        species={species}
        orderWidth={orderwidth}
        targetDate={targetDate}
      />

      <OrderRowCells hosId={hosId} order={order} species={species} />
    </TableRow>
  ))
}
