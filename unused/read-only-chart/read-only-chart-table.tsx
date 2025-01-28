'use client'

import ReadOnlyChartCells from '@/unused/read-only-chart/read-only-chart-cells'
import ReadOnlyChartRowTitle from '@/unused/read-only-chart/read-only-chart-row-title'
import OrderWidthButton from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-header/order-width-button'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { TIMES } from '@/constants/hospital/icu/chart/time'
import useIsMobile from '@/hooks/use-is-mobile'
import useLocalStorage from '@/hooks/use-local-storage'
import { borderedOrderClassName } from '@/lib/utils/utils'
import { IcuOrderColors } from '@/types/adimin'
import type { IcuReadOnlyOrderData } from '@/types/icu/chart'

export default function ReadOnlyChartTable({
  chartOrderData,
  orderColorsData,
  orderColorDisplay,
  orderFontSizeData,
}: {
  chartOrderData: IcuReadOnlyOrderData[]
  orderColorsData: IcuOrderColors
  orderColorDisplay: string
  orderFontSizeData: number
}) {
  const [orderWidth, setOrderWidth] = useLocalStorage('shareOrderWidth', 400)
  const isMobile = useIsMobile()

  return (
    <Table className="border">
      <TableHeader className="sticky top-0 z-10 bg-white shadow-sm">
        <TableRow>
          <TableHead
            className="flex items-center justify-between px-0.5 text-center"
            style={{
              width: isMobile ? 300 : orderWidth,
              transition: 'width 0.3s ease-in-out',
            }}
          >
            <span className="w-full text-center">오더 목록</span>
            <OrderWidthButton
              orderWidth={orderWidth as [300, 400, 500, 600][number]}
              setOrderWidth={setOrderWidth}
              isMobile={isMobile}
            />
          </TableHead>

          {TIMES.map((time) => (
            <TableHead className="border text-center" key={time}>
              {time.toString().padStart(2, '0')}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {chartOrderData.map((order, index) => (
          <TableRow
            className="relative divide-x"
            key={order.icu_chart_order_id}
            style={borderedOrderClassName(chartOrderData, order, index)}
            data-guide="order-list"
          >
            <ReadOnlyChartRowTitle
              order={order}
              orderColorDisplay={orderColorDisplay}
              orderColorsData={orderColorsData}
              orderFontSizeData={orderFontSizeData}
              orderWidth={orderWidth}
              isMobile={isMobile}
            />

            <ReadOnlyChartCells
              treatments={order.treatments ?? []}
              orderTimes={order.icu_chart_order_time}
            />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
