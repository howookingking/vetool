import OrderWidthButton from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-header/order-width-button'
import SortingButton from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-header/sorting-button'
import { TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import { type OrderWidth } from '@/types/hospital/order'
import { type SelectedIcuOrder } from '@/types/icu/chart'
import type { Dispatch, SetStateAction } from 'react'
type Props = {
  isSorting: boolean
  orderWidth: OrderWidth
  setOrderWidth: Dispatch<SetStateAction<OrderWidth>>
  sortedOrders: SelectedIcuOrder[]
  setIsSorting: Dispatch<SetStateAction<boolean>>
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
  const {
    basicHosData: { baselineTime },
  } = useBasicHosDataContext()

  const newTime = new Array(24)
    .fill(0)
    .map((_, i) => (Number(baselineTime) + i) % 24)

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

        {newTime.map((time) => (
          <TableHead className="border text-center" key={time}>
            {time.toString().padStart(2, '0')}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  )
}
