import { TableRow } from '@/components/ui/table'
import { borderedOrderClassName } from '@/lib/utils/utils'
import { type IcuOrderColors } from '@/types/adimin'
import { type SelectedIcuOrder } from '@/types/icu/chart'
import DtOrderRowCells from './dt-order-row-cells'
import DtOrderRowTitle from './dt-order-row-title'

type Props = {
  sortedOrders: SelectedIcuOrder[]
  isSorting: boolean
  orderwidth: number
  isSetting?: boolean
  localColorState?: IcuOrderColors
  localColorDisplayMethod?: 'dot' | 'full'
}

export default function DtOrderRows({
  sortedOrders,
  isSorting,
  orderwidth,
  isSetting,
  localColorDisplayMethod,
  localColorState,
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
              isSetting={isSetting}
              localColorDisplayMethod={localColorDisplayMethod}
              localColorState={localColorState}
            />

            <DtOrderRowCells />
          </TableRow>
        )
      })}
    </>
  )
}
