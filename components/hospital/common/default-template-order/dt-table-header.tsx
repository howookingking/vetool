import OrderWidthButton, {
  type OrderWidth,
} from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-header/order-width-button'
import SortingButton from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-header/sorting-button'
import { TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TIMES } from '@/constants/hospital/icu/chart/time'
import type { Dispatch, SetStateAction } from 'react'

type Props = {
  isSorting: boolean
  onSortToggle: () => void
  orderWidth: OrderWidth
  setOrderWidth: Dispatch<SetStateAction<OrderWidth>>
  orderCount: number
}

export default function DtTableHeader({
  isSorting,
  orderWidth,
  setOrderWidth,
  onSortToggle,
  orderCount,
}: Props) {
  return (
    <TableHeader className="sticky top-0 z-10 bg-white shadow-sm">
      <TableRow>
        <TableHead
          className="flex items-center justify-between px-0.5"
          style={{
            width: orderWidth,
            transition: 'width 0.3s ease-in-out ',
          }}
        >
          <SortingButton isSorting={isSorting} onClick={onSortToggle} />

          <span>오더 {orderCount === 0 ? '' : `(${orderCount})`}</span>

          <OrderWidthButton
            orderWidth={orderWidth}
            setOrderWidth={setOrderWidth}
          />
        </TableHead>

        {TIMES.map((time) => (
          <TableHead className="border text-center" key={time}>
            {time.toString().padStart(2, '0')}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  )
}
