import type { OrderWidth } from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-header/order-width-button'
import { TableBody, TableRow } from '@/components/ui/table'
import { borderedOrderClassName } from '@/lib/utils/utils'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import type { IcuOrderColors } from '@/types/adimin'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import ReadOnlyOrderRowCells from './read-only-order-row-cells'
import ReadOnlyOrderRowTitle from './read-only-order-row-title'

type Props = {
  orderWidth: OrderWidth
  orders: SelectedIcuOrder[]
  species: string
  localColorState?: IcuOrderColors // 오더색 설정에서 디스플레이 예시
}

export default function ReadOnlyChartTableBody({
  orderWidth,
  orders,
  species,
  localColorState,
}: Props) {
  const {
    basicHosData: {
      showOrderer,
      vitalRefRange,
      timeGuidelineData,
      orderColorsData,
      orderFontSizeData,
    },
  } = useBasicHosDataContext()

  return (
    <TableBody>
      {orders.map((order, index) => {
        return (
          <TableRow
            className="w-full divide-x"
            key={order.order_id}
            style={borderedOrderClassName(orders, order, index)}
          >
            <ReadOnlyOrderRowTitle
              order={order}
              vitalRefRange={vitalRefRange}
              species={species}
              orderWidth={orderWidth}
              orderColorsData={
                localColorState ? localColorState : orderColorsData
              }
              orderFontSizeData={orderFontSizeData}
            />

            <ReadOnlyOrderRowCells
              order={order}
              showOrderer={showOrderer}
              vitalRefRange={vitalRefRange}
              species={species}
              timeGuidelineData={timeGuidelineData}
            />
          </TableRow>
        )
      })}
    </TableBody>
  )
}
