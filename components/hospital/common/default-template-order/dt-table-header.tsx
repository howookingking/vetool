import OrderWidthButton from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-header/order-width-button'
import SortingButton from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-header/sorting-button'
import { TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TIMES } from '@/constants/hospital/icu/chart/time'
import { type OrderWidth } from '@/types/hospital/order'
import { type SelectedIcuOrder } from '@/types/icu/chart'
import type { Dispatch, SetStateAction } from 'react'
type Props = {
  isSorting: boolean
  setIsSorting: Dispatch<SetStateAction<boolean>>
  orderWidth: OrderWidth
  setOrderWidth: Dispatch<SetStateAction<OrderWidth>>
  sortedOrders: SelectedIcuOrder[]
  defaultChartOrders: SelectedIcuOrder[]
  isSetting?: boolean
}

export default function DtTableHeader({
  isSorting,
  orderWidth,
  setOrderWidth,
  setIsSorting,
  sortedOrders,
  defaultChartOrders,
  isSetting,
}: Props) {
  return (
    <TableHeader className="shadow-sm">
      <TableRow>
        <TableHead
          className="flex items-center justify-between px-0.5 text-center"
          style={{
            width: orderWidth,
            transition: 'width 0.3s ease-in-out ',
          }}
        >
          <SortingButton
            prevOrders={defaultChartOrders}
            sortedOrders={sortedOrders}
            isSorting={isSorting}
            setIsSorting={setIsSorting}
            isDt
            isSetting={isSetting}
          />

          <span className="text-center">기본오더</span>

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
