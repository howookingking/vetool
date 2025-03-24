import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import React, { useEffect } from 'react'

type Props = {
  createOrder: (order: string, value: string) => Promise<void>
  setOrderType: React.Dispatch<React.SetStateAction<string>>
  availableCheckListOrders: string[]
}

export default function ChecklistOrderCreator({
  createOrder,
  setOrderType,
  availableCheckListOrders,
}: Props) {
  // checklist 오더가 더이상 없는 경우 manual로 바꾸기
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
