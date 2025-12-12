import { TableCell } from '@/components/ui/table'
import { cn } from '@/lib/utils/utils'
import type { IcuOrderColors } from '@/types/adimin'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import type { Dispatch, SetStateAction } from 'react'
import DtOrderDialog from './dt-order-dialog'

type Props = {
  order: SelectedIcuOrder
  index: number
  isSorting: boolean
  orderWidth: number
  localColorState?: IcuOrderColors
  setSortedOrders: Dispatch<SetStateAction<SelectedIcuOrder[]>>
  hosId: string
  isTemplate?: boolean
}

export default function DtOrderRowTitle({
  order,
  isSorting,
  index,
  orderWidth,
  setSortedOrders,
  hosId,
  isTemplate,
}: Props) {
  return (
    <TableCell
      className={cn(
        'handle group p-0',
        isSorting && index % 2 === 0 && 'animate-shake-strong',
        isSorting && index % 2 !== 0 && 'animate-shake-strong-reverse',
      )}
      style={{
        width: orderWidth,
        transition: 'width 0.3s ease-in-out, transform 0.3s ease-in-out',
      }}
    >
      <DtOrderDialog
        order={order}
        setSortedOrders={setSortedOrders}
        isLastDefaultOrder={false}
        hosId={hosId}
        isTemplate={isTemplate}
      />
    </TableCell>
  )
}
