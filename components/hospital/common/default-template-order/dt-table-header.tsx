import { TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TIMES } from '@/constants/hospital/icu/chart/time'
import { type SelectedIcuOrder } from '@/types/icu/chart'
import { type Dispatch, type SetStateAction } from 'react'
import OrderWidthButton from '../../icu/main/chart/selected-chart/chart-body/table/chart-table-header/order-width-button'
import SortingButton from '../../icu/main/chart/selected-chart/chart-body/table/chart-table-header/sorting-button'

type DtTableHeaderProps = {
  isSorting: boolean
  orderWidth: number
  setOrderWidth: Dispatch<SetStateAction<number>>
  sortedOrders: SelectedIcuOrder[]
  setIsSorting: Dispatch<SetStateAction<boolean>>
  defaultChartOrders: SelectedIcuOrder[]
}

export default function DtTableHeader({
  isSorting,
  orderWidth,
  setOrderWidth,
  setIsSorting,
  sortedOrders,
  defaultChartOrders,
}: DtTableHeaderProps) {
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
          />

          <span className="text-center">기본오더</span>

          <OrderWidthButton
            orderWidth={orderWidth as [300, 400, 500, 600][number]}
            setOrderWidth={setOrderWidth}
            isMobile={false}
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
