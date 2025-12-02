import OrderWidthButton from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-header/order-width-button'
import { TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TIMES } from '@/constants/hospital/icu/chart/time'
import type { OrderWidth } from '@/types/hospital/order'
import type { Dispatch, SetStateAction } from 'react'

type Props = {
  orderWidth: OrderWidth
  setOrderWidth: Dispatch<SetStateAction<OrderWidth>>
}

export default function ReadOnlyChartTableHeader({
  orderWidth,
  setOrderWidth,
}: Props) {
  return (
    <TableHeader className="shadow-sm">
      <TableRow>
        <TableHead
          className="relative text-center"
          style={{ width: orderWidth }}
        >
          오더 목록
          <div className="absolute right-0 top-1/2 -translate-y-1/2">
            <OrderWidthButton
              orderWidth={orderWidth}
              setOrderWidth={setOrderWidth}
            />
          </div>
        </TableHead>

        {TIMES.map((time) => {
          return (
            <TableHead className="border-l text-center" key={time}>
              {time.toString().padStart(2, '0')}
            </TableHead>
          )
        })}
      </TableRow>
    </TableHeader>
  )
}
