import PasteTemplateOrderDialog from '@/components/hospital/icu/main/chart/paste-chart-dialogs/template/paste-template-order-dialog'
import OrderWidthButton, {
  type OrderWidth,
} from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-header/order-width-button'
import SortingButton from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-header/sorting-button'
import { TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TIMES } from '@/constants/hospital/icu/chart/time'
import { useCurrentTime } from '@/hooks/use-current-time'
import type { SelectedIcuChart, SelectedIcuOrder } from '@/types/icu/chart'
import { isToday } from 'date-fns'
import type { Dispatch, SetStateAction } from 'react'
import { CurrentTimeIndicator } from './current-time-indicator'

type Props = {
  chartData: SelectedIcuChart
  sortedOrders: SelectedIcuOrder[]
  isSorting: boolean
  onSortToggle: () => void
  orderWidth: OrderWidth
  setOrderWidth: Dispatch<SetStateAction<OrderWidth>>
  chartId?: string
  hosId: string
  targetDate?: string
}

export default function ChartTableHeader({
  chartData,
  sortedOrders,
  isSorting,
  onSortToggle,
  orderWidth,
  setOrderWidth,
  chartId,
  hosId,
  targetDate,
}: Props) {
  const { hours, minutes } = useCurrentTime()
  const isTargetDateToday = targetDate ? isToday(targetDate) : false

  return (
    <TableHeader className="sticky top-12 z-20 bg-white shadow-sm">
      <TableRow>
        <TableHead
          className="relative flex items-center justify-between px-0.5"
          style={{
            width: orderWidth,
            transition: 'width 0.3s ease-in-out ',
          }}
        >
          <SortingButton isSorting={isSorting} onClick={onSortToggle} />

          <span className="absolute -z-10 w-full text-center">
            오더 ({sortedOrders.length})
          </span>

          <div className="absolute right-0.5 flex items-center gap-0.5">
            {!isSorting ? (
              <PasteTemplateOrderDialog
                tableHeader
                chartId={chartId}
                hosId={hosId}
                patientId={chartData.patient.patient_id}
                targetDate={targetDate}
              />
            ) : null}

            {!isSorting ? (
              <OrderWidthButton
                orderWidth={orderWidth}
                setOrderWidth={setOrderWidth}
              />
            ) : null}
          </div>
        </TableHead>

        {TIMES.map((time) => {
          const shouldShowIndicator = time === hours ? isTargetDateToday : false
          return (
            <TableHead className="relative border text-center" key={time}>
              {time.toString().padStart(2, '0')}
              {shouldShowIndicator ? (
                <CurrentTimeIndicator minutes={minutes} />
              ) : null}
            </TableHead>
          )
        })}
      </TableRow>
    </TableHeader>
  )
}
