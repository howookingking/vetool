import { TableBody, TableRow } from '@/components/ui/table'
import { borderedOrderClassName } from '@/lib/utils/utils'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import type { OrderWidth } from '@/types/hospital/order'
import type { SelectedIcuChart } from '@/types/icu/chart'
import ReadOnlyOrderRowCells from './read-only-order-row-cells'
import ReadOnlyOrderRowTitle from './read-only-order-row-title'

type Props = {
  orderWidth: OrderWidth
  chartData: SelectedIcuChart
}

export default function ReadOnlyChartTableBody({
  orderWidth,
  chartData,
}: Props) {
  const {
    orders,
    patient: { species },
  } = chartData

  const {
    basicHosData: { showOrderer, vitalRefRange, timeGuidelineData },
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
