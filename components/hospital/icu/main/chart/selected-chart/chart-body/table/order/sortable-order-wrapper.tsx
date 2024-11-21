import { SelectedIcuOrder } from '@/types/icu/chart'
import { Dispatch, ReactNode, SetStateAction } from 'react'
import { ReactSortable, Sortable } from 'react-sortablejs'

export default function SortableOrderWrapper({
  children,
  orders,
  onOrdersChange,
  onSortEnd,
}: {
  children: ReactNode
  orders: SelectedIcuOrder[]
  onOrdersChange: Dispatch<SetStateAction<SelectedIcuOrder[]>>
  onSortEnd: (event: Sortable.SortableEvent) => void
}) {
  return (
    <ReactSortable
      list={orders}
      setList={onOrdersChange}
      animation={250}
      handle=".handle"
      tag="tbody"
      onEnd={onSortEnd}
      className="w-full"
    >
      {children}
    </ReactSortable>
  )
}
