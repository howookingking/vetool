import OrderWidthButton, {
  type OrderWidth,
} from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-header/order-width-button'
import SortingButton from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-header/sorting-button'
import { TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TIMES } from '@/constants/hospital/icu/chart/time'
import { useCurrentTime } from '@/hooks/use-current-time'
import { isToday } from 'date-fns'
import type { Dispatch, SetStateAction } from 'react'
import { CurrentTimeIndicator } from './current-time-indicator'

type Props = {
  isSorting: boolean
  onSortToggle: () => void
  orderWidth: OrderWidth
  setOrderWidth: Dispatch<SetStateAction<OrderWidth>>
  targetDate?: string
  orderCount: number
}

export default function ChartTableHeader({
  isSorting,
  onSortToggle,
  orderWidth,
  setOrderWidth,
  targetDate,
  orderCount,
}: Props) {
  const { hours, minutes } = useCurrentTime()
  const isTargetDateToday = targetDate ? isToday(targetDate) : false

  return (
    <TableHeader className="sticky top-12 z-20 bg-white shadow-sm">
      <TableRow>
        <TableHead
          className="flex items-center justify-between px-0.5"
          style={{
            width: orderWidth,
            transition: 'width 0.3s ease-in-out ',
          }}
        >
          <SortingButton isSorting={isSorting} onClick={onSortToggle} />

          <span className="w-full text-center">오더 ({orderCount})</span>

          <OrderWidthButton
            orderWidth={orderWidth}
            setOrderWidth={setOrderWidth}
          />
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
