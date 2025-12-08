'use client'

import ChartTableBody from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-body/chart-table-body'
import SortingOrderRows from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-body/sorting-order-rows'
import ChartTableHeader from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-header/chart-table-header'
import { Table } from '@/components/ui/table'
import useLocalStorage from '@/hooks/use-local-storage'
import { useOrderSorting } from '@/hooks/use-order-sorting'
import type { SelectedIcuChart } from '@/types/icu/chart'
import type { RefObject } from 'react'
import type { OrderWidth } from './chart-table-header/order-width-button'

type Props = {
  chartData: SelectedIcuChart
  cellRef?: RefObject<HTMLTableRowElement>
  targetDate?: string
}

export default function ChartTable({ chartData, cellRef, targetDate }: Props) {
  const { icu_chart_id, orders, patient, hos_id } = chartData

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
  } = useOrderSorting({ initialOrders: orders })

  return (
    <Table className="border">
      {/* 소팅버튼, 오더목록, 오더너비조절 버튼, 시간 */}
      <ChartTableHeader
        chartData={chartData}
        isSorting={isSorting}
        onSortToggle={handleSortToggle}
        sortedOrders={sortedOrders}
        orderWidth={orderWidth}
        setOrderWidth={setOrderWidth}
        chartId={icu_chart_id}
        hosId={hos_id}
        targetDate={targetDate}
      />

      {isSorting ? (
        <SortingOrderRows
          isSorting={isSorting}
          orderWidth={orderWidth}
          setSortedOrders={setSortedOrders}
          sortedOrders={sortedOrders}
          species={patient.species}
          onOrderMove={handleOrderMove}
        />
      ) : (
        <ChartTableBody
          isSorting={isSorting}
          sortedOrders={sortedOrders}
          orderWidth={orderWidth}
          icuChartId={icu_chart_id}
          setSortedOrders={setSortedOrders}
          cellRef={cellRef}
          chartData={chartData}
        />
      )}
    </Table>
  )
}
