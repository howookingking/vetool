import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { borderedOrderClassName, cn, parsingOrderName } from '@/lib/utils/utils'
import type { IcuOrderColors } from '@/types/adimin'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { RefObject } from 'react'

export default function OrderTableRow({
  order,
  sortedOrders,
  index,
  orderColors,
  onEdit,
  orderRef,
  isSorting,
}: {
  order: SelectedIcuOrder
  sortedOrders: SelectedIcuOrder[]
  index: number
  orderColors: IcuOrderColors
  onEdit: (order: Partial<SelectedIcuOrder>, index?: number) => void
  orderRef: RefObject<HTMLTableCellElement>
  isSorting?: boolean
}) {
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
          background: orderColors[order.order_type as keyof IcuOrderColors],
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
            'flex w-full justify-between rounded-none bg-transparent px-2',
            isSorting ? 'cursor-grab' : 'cursor-pointer',
          )}
        >
          <span className="truncate">
            {parsingOrderName(order.order_type, order.order_name)}
          </span>
          <span className="text-xs text-muted-foreground">
            {order.order_comment}
          </span>
        </Button>
      </TableCell>
    </TableRow>
  )
}
