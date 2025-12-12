import type { SelectedIcuOrder } from '@/types/icu/chart'
import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { ReactSortable, type Sortable } from 'react-sortablejs'

type Props = {
  children: ReactNode
  orders: SelectedIcuOrder[]
  onOrdersChange: Dispatch<SetStateAction<SelectedIcuOrder[]>>
  onSortEnd: (event: Sortable.SortableEvent) => void
}

export default function SortableOrderWrapper({
  children,
  orders,
  onOrdersChange,
  onSortEnd,
}: Props) {
  return (
    <ReactSortable
      list={orders}
      setList={onOrdersChange}
      animation={250}
      handle=".handle"
      tag="tbody"
      onEnd={onSortEnd}
    >
      {children}
    </ReactSortable>
  )
}
