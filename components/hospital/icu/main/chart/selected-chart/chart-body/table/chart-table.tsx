'use client'

import ChartTableBody from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-body/chart-table-body'
import SortingOrderRows from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-body/sorting-order-rows'
import ChartTableHeader from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-header/chart-table-header'
import { Table } from '@/components/ui/table'
import useLocalStorage from '@/hooks/use-local-storage'
import useOrderSorting from '@/hooks/use-order-sorting'
import type { SelectedIcuChart } from '@/types/icu/chart'
import type { OrderWidth } from './chart-table-header/order-width-button'

type Props = {
  chartData: SelectedIcuChart
  targetDate: string
  hosId: string
}

export default function ChartTable({ chartData, targetDate, hosId }: Props) {
  const { icu_chart_id, orders } = chartData

  const [orderWidth, setOrderWidth] = useLocalStorage<OrderWidth>(
    'orderWidth',
    400,
  )

  const {
    isSorting,
    handleSortToggle,
    sortedOrders,
    setSortedOrders,
    handleOrderMove,
  } = useOrderSorting({ initialOrders: orders, type: 'chart' })

  return (
    <Table className="border">
      <ChartTableHeader
        orderCount={orders.length}
        isSorting={isSorting}
        onSortToggle={handleSortToggle}
        orderWidth={orderWidth}
        setOrderWidth={setOrderWidth}
        targetDate={targetDate}
      />

      {isSorting ? (
        <SortingOrderRows
          isSorting={isSorting}
          orderWidth={orderWidth}
          setSortedOrders={setSortedOrders}
          sortedOrders={sortedOrders}
          onOrderMove={handleOrderMove}
          targetDate={targetDate}
        />
      ) : (
        <ChartTableBody
          isSorting={isSorting}
          sortedOrders={sortedOrders}
          orderWidth={orderWidth}
          icuChartId={icu_chart_id}
          setSortedOrders={setSortedOrders}
          chartData={chartData}
          hosId={hosId}
          targetDate={targetDate}
        />
      )}
    </Table>
  )
}
