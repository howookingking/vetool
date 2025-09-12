import { TableRow } from '@/components/ui/table'
import { borderedOrderClassName } from '@/lib/utils/utils'
import type { IcuOrderColors } from '@/types/adimin'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import DtOrderRowCells from './dt-order-row-cells'
import DtOrderRowTitle from './dt-order-row-title'

type Props = {
  sortedOrders: SelectedIcuOrder[]
  isSorting: boolean
  orderwidth: number
  // 오더 색상 설정에서 바로 화면에 반영되도록 local state임, 다른 컴포넌트(기본오더, 템플릿)에서는 undefined
  localColorState?: IcuOrderColors
  localColorDisplayMethod?: 'dot' | 'full'
}

export default function DtOrderRows({
  sortedOrders,
  isSorting,
  orderwidth,
  localColorState,
  localColorDisplayMethod,
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
              localColorState={localColorState}
              localColorDisplayMethod={localColorDisplayMethod}
            />

            <DtOrderRowCells order={order} />
          </TableRow>
        )
      })}
    </>
  )
}
