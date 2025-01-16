import OrderTitleContent from '@/components/hospital/common/order-title-content'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { borderedOrderClassName, cn } from '@/lib/utils/utils'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import type { IcuOrderColors } from '@/types/adimin'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { RefObject } from 'react'

export default function OrderTableRow({
  order,
  sortedOrders,
  index,
  onEdit,
  orderRef,
  isSorting,
}: {
  order: SelectedIcuOrder
  sortedOrders: SelectedIcuOrder[]
  index: number
  onEdit: (order: Partial<SelectedIcuOrder>, index?: number) => void
  orderRef: RefObject<HTMLTableCellElement>
  isSorting?: boolean
}) {
  const {
    basicHosData: { orderColorsData, orderColorDisplay, orderFontSizeData },
  } = useBasicHosDataContext()

  return (
    <TableRow
      className={cn('divide-x')}
      style={borderedOrderClassName(sortedOrders, order, index)}
    >
      <TableCell
        className={cn(
          'handle group cursor-grab p-0',
          isSorting && index % 2 === 0 && 'animate-shake',
          isSorting && index % 2 !== 0 && 'animate-shake-reverse',
        )}
        ref={orderRef}
        style={{
          background:
            orderColorDisplay === 'full'
              ? orderColorsData[order.order_type as keyof IcuOrderColors]
              : 'transparent',
        }}
      >
        <Button
          variant="ghost"
          onClick={() =>
            onEdit({
              order_id: order.order_id,
              order_comment: order.order_comment,
              order_name: order.order_name,
              order_type: order.order_type,
              is_bordered: order.is_bordered,
            })
          }
          className={cn(
            'flex w-full rounded-none bg-transparent px-2',
            isSorting ? 'cursor-grab' : 'cursor-pointer',
          )}
        >
          <OrderTitleContent
            orderType={order.order_type}
            orderName={order.order_name}
            orderComment={order.order_comment}
            orderColorDisplay={orderColorDisplay}
            orderColorsData={orderColorsData}
            orderFontSizeData={orderFontSizeData}
          />
        </Button>
      </TableCell>
    </TableRow>
  )
}
