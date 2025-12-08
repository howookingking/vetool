import type { OrderWidth } from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-header/order-width-button'
import { Table } from '@/components/ui/table'
import useLocalStorage from '@/hooks/use-local-storage'
import type { SelectedIcuChart } from '@/types/icu/chart'
import ReadOnlyChartTableBody from './read-only-chart-table-body'
import ReadOnlyChartTableHeader from './read-only-chart-table-header'

export default function ReadOnlyChartTable({
  chartData,
}: {
  chartData: SelectedIcuChart
}) {
  const [orderWidth, setOrderWidth] = useLocalStorage<OrderWidth>(
    'orderWidth',
    400,
  )
  return (
    <Table className="border">
      <ReadOnlyChartTableHeader
        orderWidth={orderWidth}
        setOrderWidth={setOrderWidth}
      />

      <ReadOnlyChartTableBody chartData={chartData} orderWidth={orderWidth} />
    </Table>
  )
}
