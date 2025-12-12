import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { OrderType } from '@/constants/hospital/icu/chart/order'
import { type Dispatch, type SetStateAction, useEffect } from 'react'

type Props = {
  createOrder: (orderName: string, orderComment: string) => Promise<void>
  setOrderType: Dispatch<SetStateAction<OrderType>>
  availableCheckListOrders: string[]
}

export default function ChecklistOrderCreator({
  createOrder,
  setOrderType,
  availableCheckListOrders,
}: Props) {
  useEffect(() => {
    if (availableCheckListOrders.length === 0) {
      setOrderType('manual')
    }
  }, [availableCheckListOrders.length, setOrderType])

  return (
    <Select onValueChange={async (value) => await createOrder(value, '')}>
      <SelectTrigger className="h-11 w-full rounded-none border-0 ring-0 focus-visible:ring-0">
        <SelectValue placeholder="체크리스트 항목 선택" />
      </SelectTrigger>

      <SelectContent>
        {availableCheckListOrders.map((order) => (
          <SelectItem key={order} value={order}>
            {order}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
