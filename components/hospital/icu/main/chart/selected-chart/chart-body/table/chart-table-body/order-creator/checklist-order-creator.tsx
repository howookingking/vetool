import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type {
  ChecklistOrder,
  OrderType,
} from '@/constants/hospital/icu/chart/order'
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'

type Props = {
  createOrder: (orderName: string, orderComment: string) => Promise<void>
  setOrderType: Dispatch<SetStateAction<OrderType | 'template'>>
  availableCheckListOrders: ChecklistOrder[]
  isSubmitting: boolean
}

export default function ChecklistOrderCreator({
  createOrder,
  setOrderType,
  availableCheckListOrders,
  isSubmitting,
}: Props) {
  const [localChecklistOrder, setLocalChecklistOrder] = useState<
    ChecklistOrder | ''
  >('')

  useEffect(() => {
    if (availableCheckListOrders.length === 0) {
      setOrderType('manual')
    }
  }, [availableCheckListOrders.length, setOrderType])

  const handleSelect = async (value: ChecklistOrder) => {
    await createOrder(value, '')

    setLocalChecklistOrder('')
  }

  return (
    <Select value={localChecklistOrder} onValueChange={handleSelect}>
      <SelectTrigger
        className="h-11 w-full rounded-none border-0 ring-0 ring-inset ring-offset-0 focus:outline-none"
        disabled={isSubmitting}
      >
        <SelectValue
          placeholder={isSubmitting ? '등록 중...' : '체크리스트 항목 선택'}
        />
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
