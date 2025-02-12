'use client'

import ChartTableBody from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-body/chart-table-body'
import SortingOrderRows from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-body/sorting-order-rows'
import ChartTableHeader from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-header/chart-table-header'
import { Table } from '@/components/ui/table'
import useLocalStorage from '@/hooks/use-local-storage'
import { type SelectedChart, type SelectedIcuOrder } from '@/types/icu/chart'
import { type RefObject, useEffect, useState } from 'react'
import { type OrderWidth } from './chart-table-header/order-width-button'

type Props = {
  chartData: SelectedChart
  preview?: boolean
  isExport?: boolean
  cellRef?: RefObject<HTMLTableRowElement>
}

export default function ChartTable({
  chartData,
  preview,
  isExport,
  cellRef,
}: Props) {
  const { icu_chart_id, orders, patient, hos_id } = chartData

  const [orderWidth, setOrderWidth] = useLocalStorage<OrderWidth>(
    'orderWidth',
    400,
  )

  const [isSorting, setIsSorting] = useState(false)
  const [sortedOrders, setSortedOrders] = useState<SelectedIcuOrder[]>(orders)

  useEffect(() => {
    setSortedOrders(orders)
  }, [orders])

  return (
    <Table className="border">
      {/* 소팅버튼, 오더목록, 오더너비조절 버튼, 시간 */}
      <ChartTableHeader
        chartData={chartData}
        isSorting={isSorting}
        setIsSorting={setIsSorting}
        preview={preview}
        sortedOrders={sortedOrders}
        isExport={isExport}
        setSortedOrders={setSortedOrders}
        orderWidth={orderWidth}
        setOrderWidth={setOrderWidth}
        chartId={icu_chart_id}
        hosId={hos_id}
      />

      {isSorting ? (
        <SortingOrderRows
          isSorting={isSorting}
          orderWidth={orderWidth}
          preview={preview}
          setSortedOrders={setSortedOrders}
          sortedOrders={sortedOrders}
          species={patient.species}
        />
      ) : (
        <ChartTableBody
          isSorting={isSorting}
          sortedOrders={sortedOrders}
          preview={preview}
          orderWidth={orderWidth}
          isExport={isExport}
          icuChartId={icu_chart_id}
          setSortedOrders={setSortedOrders}
          cellRef={cellRef}
          chartData={chartData}
        />
      )}
    </Table>
  )
}
