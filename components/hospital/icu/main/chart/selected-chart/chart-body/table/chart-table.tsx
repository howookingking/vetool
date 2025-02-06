'use client'

import ChartTableBody from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-body/chart-table-body'
import SortingOrderRows from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-body/sorting-order-rows'
import ChartTableHeader from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-header/chart-table-header'
import { Table } from '@/components/ui/table'
import useIsMobile from '@/hooks/use-is-mobile'
import useLocalStorage from '@/hooks/use-local-storage'
import { type SelectedChart, type SelectedIcuOrder } from '@/types/icu/chart'
import { type RefObject, useEffect, useState } from 'react'

type ChartTableProps = {
  chartData: SelectedChart
  preview?: boolean
  isExport?: boolean
  cellRef?: RefObject<HTMLTableRowElement>
  isTouchMove?: boolean
}

export default function ChartTable({
  chartData,
  preview,
  isExport,
  cellRef,
  isTouchMove,
}: ChartTableProps) {
  const { icu_chart_id, orders, patient, hos_id } = chartData

  // 확정
  const [orderWidth, setOrderWidth] = useLocalStorage('orderWidth', 400)

  const isMobile = useIsMobile()

  // 확정
  const [isSorting, setIsSorting] = useState(false)

  // 확정
  const [sortedOrders, setSortedOrders] = useState<SelectedIcuOrder[]>(orders)

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
        isTouchMove={isTouchMove}
        isMobile={isMobile}
        chartId={icu_chart_id}
        hosId={hos_id}
      />

      {isSorting ? (
        <SortingOrderRows
          isMobile={isMobile}
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
          isMobile={isMobile}
          isTouchMove={isTouchMove}
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
