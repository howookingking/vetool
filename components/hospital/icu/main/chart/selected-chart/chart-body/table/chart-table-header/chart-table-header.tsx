import PasteTemplateOrderDialog from '@/components/hospital/icu/main/chart/paste-chart-dialogs/template/paste-template-order-dialog'
import OrderWidthButton from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-header/order-width-button'
import SortingButton from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-header/sorting-button'
import { TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TIMES } from '@/constants/hospital/icu/chart/time'
import { useCurrentTime } from '@/hooks/use-current-time'
import { cn } from '@/lib/utils/utils'
import type { OrderWidth } from '@/types/hospital/order'
import type { SelectedChart, SelectedIcuOrder } from '@/types/icu/chart'
import type { Dispatch, SetStateAction } from 'react'
import { CurrentTimeIndicator } from './current-time-indicator'
import { formatDate } from 'date-fns'

type Props = {
  preview?: boolean
  chartData: SelectedChart
  sortedOrders: SelectedIcuOrder[]
  isSorting: boolean
  setIsSorting: Dispatch<SetStateAction<boolean>>
  isEditOrderMode?: boolean
  orderWidth: OrderWidth
  isExport?: boolean
  setOrderWidth: Dispatch<SetStateAction<OrderWidth>>
  chartId?: string
  hosId: string
}

export default function ChartTableHeader({
  preview,
  chartData,
  sortedOrders,
  isSorting,
  setIsSorting,
  orderWidth,
  setOrderWidth,
  chartId,
  hosId,
}: Props) {
  const { hours, minutes } = useCurrentTime()
  const isToday = formatDate(new Date(), 'yyyy-MM-dd') === chartData.target_date

  return (
    <TableHeader
      data-guide="order-info"
      className={cn(
        preview ? 'top-0' : 'top-12',
        'sticky z-20 bg-white shadow-sm',
      )}
    >
      <TableRow>
        <TableHead
          className="flex items-center justify-between px-0.5 text-center"
          style={{
            width: orderWidth,
            transition: 'width 0.3s ease-in-out ',
          }}
        >
          {!preview && (
            <SortingButton
              prevOrders={chartData.orders}
              sortedOrders={sortedOrders}
              isSorting={isSorting}
              setIsSorting={setIsSorting}
            />
          )}

          <span className="w-full text-center">오더 목록</span>

          {!preview && !isSorting && (
            <PasteTemplateOrderDialog
              tableHeader
              chartId={chartId}
              hosId={hosId}
            />
          )}

          {!isSorting && (
            <OrderWidthButton
              orderWidth={orderWidth}
              setOrderWidth={setOrderWidth}
            />
          )}
        </TableHead>

        {TIMES.map((time) => {
          const shouldShowIndicator =
            time === hours && !isSorting && !preview && isToday
          return (
            <TableHead className="relative border text-center" key={time}>
              {time.toString().padStart(2, '0')}
              {shouldShowIndicator && (
                <CurrentTimeIndicator minutes={minutes} />
              )}
            </TableHead>
          )
        })}
      </TableRow>
    </TableHeader>
  )
}
