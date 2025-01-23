import OrderWidthButton from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-header/order-width-button'
import SortingButton from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-header/sorting-button'
import { TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TIMES } from '@/constants/hospital/icu/chart/time'
import { type OrderStep } from '@/lib/store/icu/icu-order'
import { cn } from '@/lib/utils/utils'
import { type SelectedChart, type SelectedIcuOrder } from '@/types/icu/chart'
import { type Dispatch, type SetStateAction } from 'react'

type ChartTableHeaderProps = {
  preview?: boolean
  chartData: SelectedChart
  sortedOrders: SelectedIcuOrder[]
  isSorting: boolean
  setIsSorting: Dispatch<SetStateAction<boolean>>
  isEditOrderMode?: boolean
  setOrderStep: (orderStep: OrderStep) => void
  orderWidth: number
  isExport?: boolean
  setSortedOrders: Dispatch<SetStateAction<SelectedIcuOrder[]>>
  setOrderWidth: Dispatch<SetStateAction<number>>
  isMobile: boolean
  isTouchMove?: boolean
}

export default function ChartTableHeader({
  preview,
  chartData,
  sortedOrders,
  isSorting,
  setIsSorting,
  orderWidth,
  setOrderWidth,
  isMobile,
  isTouchMove,
}: ChartTableHeaderProps) {
  return (
    <TableHeader
      className={cn(
        preview || isMobile ? 'top-0' : 'top-12',
        'sticky z-20 bg-white shadow-sm',
      )}
    >
      <TableRow>
        <TableHead
          className="flex items-center justify-between px-0.5 text-center"
          style={{
            width: isTouchMove ? 200 : isMobile ? 300 : orderWidth,
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

          <span className="text-center">오더 목록</span>

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
  )
}
