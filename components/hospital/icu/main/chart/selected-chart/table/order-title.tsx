'use client'

import { TableCell } from '@/components/ui/table'
import { DEFAULT_ICU_ORDER_TYPE } from '@/constants/hospital/icu/chart/order'
import { useCreateOrderStore } from '@/lib/store/icu/create-order'
import { cn } from '@/lib/utils'
import type { IcuChartOrderJoined } from '@/types/icu'

export default function OrderTitle({ order }: { order: IcuChartOrderJoined }) {
  const {
    icu_chart_order_type: orderType,
    icu_chart_order_name: orderName,
    icu_chart_order_comment: orderComment,
  } = order

  const { toggleModal, setIsEditMode, setChartOrder } = useCreateOrderStore()

  const handleDialogOpen = () => {
    toggleModal()
    setIsEditMode(true)
    setChartOrder(order)
  }

  return (
    <TableCell
      className={cn(
        'flex w-[296px] cursor-pointer items-center justify-between gap-2 transition hover:opacity-70',
      )}
      onClick={handleDialogOpen}
      title={orderComment ?? ''}
      style={{
        background: DEFAULT_ICU_ORDER_TYPE.find(
          (order) => order.value === orderType,
        )?.color,
      }}
    >
      <span className="whitespace-nowrap">{orderName}</span>
      <span className="truncate text-xs text-muted-foreground">
        {orderComment}
      </span>
    </TableCell>
  )
}