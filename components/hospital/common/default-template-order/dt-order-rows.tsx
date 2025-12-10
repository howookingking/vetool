import { TableRow } from '@/components/ui/table'
import { borderedOrderClassName } from '@/lib/utils/utils'
import type { IcuOrderColors } from '@/types/adimin'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import type { Dispatch, SetStateAction } from 'react'
import DtOrderRowCells from './dt-order-row-cells'
import DtOrderRowTitle from './dt-order-row-title'
import type { OrderWidth } from '../../icu/main/chart/selected-chart/chart-body/table/chart-table-header/order-width-button'

type Props = {
  sortedOrders: SelectedIcuOrder[]
  setSortedOrders: Dispatch<SetStateAction<SelectedIcuOrder[]>>
  isSorting: boolean
  orderWidth: OrderWidth
  // 오더 색상 설정에서 바로 화면에 반영되도록 local state임, 다른 컴포넌트(기본오더, 템플릿)에서는 undefined
  localColorState?: IcuOrderColors
  hosId: string
}

export default function DtOrderRows({
  sortedOrders,
  setSortedOrders,
  isSorting,
  orderWidth,
  localColorState,
  hosId,
}: Props) {
  return (
    <>
      {sortedOrders.map((order, index) => {
        return (
          <TableRow
            className="relative w-full divide-x"
            key={index}
            style={borderedOrderClassName(sortedOrders, order, index)}
          >
            <DtOrderRowTitle
              index={index}
              order={order}
              isSorting={isSorting}
              orderWidth={orderWidth}
              localColorState={localColorState}
              setSortedOrders={setSortedOrders}
              hosId={hosId}
            />

            <DtOrderRowCells order={order} />
          </TableRow>
        )
      })}
    </>
  )
}
