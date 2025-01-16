import OrderWidthButton from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-header/order-width-button'
import SortingButton from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-header/sorting-button'
import OrderDialog from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/order-dialog'
import { TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TIMES } from '@/constants/hospital/icu/chart/time'
import { cn } from '@/lib/utils/utils'
import type { SelectedChart, SelectedIcuOrder } from '@/types/icu/chart'
import { Dispatch, SetStateAction } from 'react'

type ChartTableHeaderProps = {
  preview?: boolean
  chartData: SelectedChart
  sortedOrders: SelectedIcuOrder[]
  isSorting: boolean
  setIsSorting: Dispatch<SetStateAction<boolean>>
  orderWidth: number
  setOrderStep: (
    orderStep: 'closed' | 'upsert' | 'selectOrderer' | 'multipleEdit',
  ) => void
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
              chartData={chartData}
              sortedOrders={sortedOrders}
              isSorting={isSorting}
              setIsSorting={setIsSorting}
            />
          )}

          <span className="w-full text-center">오더 목록</span>

          {!isSorting && (
            <OrderWidthButton
              orderWidth={orderWidth as [300, 400, 500, 600][number]}
              setOrderWidth={setOrderWidth}
              isMobile={isMobile}
            />
          )}
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
