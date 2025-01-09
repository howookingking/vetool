'use client'

import OrderTitleContent from '@/components/hospital/common/order-title-content'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { TIMES } from '@/constants/hospital/icu/chart/time'
import { borderedOrderClassName } from '@/lib/utils/utils'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import { IcuOrderColors } from '@/types/adimin'
import type { IcuReadOnlyOrderData } from '@/types/icu/chart'

export default function ReadOnlyChartTable({
  chartOrderData,
}: {
  chartOrderData: IcuReadOnlyOrderData[]
}) {
  const {
    basicHosData: { orderColorsData, orderColorDisplay },
  } = useBasicHosDataContext()

  return (
    <Table className="border">
      <TableHeader className="sticky top-0 z-10 bg-white shadow-sm">
        <TableRow>
          <TableHead className="w-[320px] text-center">오더 목록</TableHead>
          {TIMES.map((time) => (
            <TableHead className="border text-center" key={time}>
              {time.toString().padStart(2, '0')}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {chartOrderData.map((order, index) => (
          <TableRow className="divide-x" key={order.icu_chart_order_id}>
            <TableCell
              className="w-[320px] p-0"
              style={{
                background:
                  orderColorDisplay === 'full'
                    ? orderColorsData[
                        order.icu_chart_order_type as keyof IcuOrderColors
                      ]
                    : 'transparent',
              }}
            >
              <div
                className={
                  'flex h-11 w-[320px] cursor-not-allowed items-center justify-between rounded-none bg-transparent px-2 outline-none ring-inset ring-primary'
                }
                style={borderedOrderClassName(chartOrderData, order, index)}
              >
                <OrderTitleContent
                  orderType={order.icu_chart_order_type}
                  orderName={order.icu_chart_order_name}
                  orderComment={order.icu_chart_order_comment}
                  isTouchMove={true}
                />
              </div>
            </TableCell>

            {order.icu_chart_order_time.map((time, index) => (
              <TableHead key={index} className="text-center">
                {time !== '0' && <span>{time}</span>}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
