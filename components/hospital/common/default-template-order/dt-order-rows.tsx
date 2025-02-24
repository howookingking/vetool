import { TableRow } from '@/components/ui/table'
import { borderedOrderClassName } from '@/lib/utils/utils'
import { type SelectedIcuOrder } from '@/types/icu/chart'
import DtOrderRowCells from './dt-order-row-cells'
import DtOrderRowTitle from './dt-order-row-title'

type Props = {
  sortedOrders: SelectedIcuOrder[]
  isSorting: boolean
  orderwidth: number
}

export default function DtOrderRows({
  sortedOrders,
  isSorting,
  orderwidth,
}: Props) {
  return (
    <>
      {sortedOrders.map((order, index) => {
        return (
          <TableRow
            className="relative w-full divide-x"
            key={order.order_id}
            style={borderedOrderClassName(sortedOrders, order, index)}
          >
            <DtOrderRowTitle
              index={index}
              order={order}
              isSorting={isSorting}
              orderWidth={orderwidth}
            />

            <DtOrderRowCells />
          </TableRow>
        )
      })}
    </>
  )
}
