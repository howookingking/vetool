import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'
import {
  CHECKLIST_ORDER_NAMES,
  CHECKLIST_ORDERS,
  DEFAULT_ICU_ORDER_TYPE,
  QUICKORDER_PLACEHOLDER,
  type OrderType,
} from '@/constants/hospital/icu/chart/order'
import { upsertOrder } from '@/lib/services/icu/chart/order-mutation'
import { useRealtimeSubscriptionStore } from '@/lib/store/icu/realtime-subscription'
import { cn } from '@/lib/utils/utils'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import { IcuOrderColors } from '@/types/adimin'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { useParams, useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useState } from 'react'

type QuickOrderInsertInputProps = {
  icuChartId: string
  setSortedOrders: Dispatch<SetStateAction<SelectedIcuOrder[]>>
}

export default function QuickOrderInsertInput({
  icuChartId,
  setSortedOrders,
}: QuickOrderInsertInputProps) {
  const {
    basicHosData: { orderColorsData },
  } = useBasicHosDataContext()
  const { hos_id } = useParams()
  const { refresh } = useRouter()
  const { isSubscriptionReady } = useRealtimeSubscriptionStore()
  const [quickOrderInput, setQuickOrderInput] = useState('')
  const [orderType, setOrderType] = useState('manual')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isChecklistOrder, setIsChecklistOrder] = useState(false)

  const createOrder = async (orderName: string, orderDescription: string) => {
    // 빠른 오더를 생성하고, 기존 오더 배열에 추가
    const newOrder = {
      id: 1,
      order_id: `temp_order_id_${new Date().getTime()}`,
      order_name: orderName.trim(),
      order_comment: orderDescription ? orderDescription.trim() : '',
      order_type: orderType,
      order_times: Array(24).fill('0'),
      treatments: [],
    }

    setSortedOrders((prev) => [...prev, newOrder])

    // 빠른 오더가 포함된 오더를 UPSERT
    await upsertOrder(
      hos_id as string,
      icuChartId,
      undefined,
      Array(24).fill('0'),
      {
        icu_chart_order_name: orderName.trim(),
        icu_chart_order_comment: orderDescription
          ? orderDescription.trim()
          : '',
        icu_chart_order_type: orderType,
      },
    )

    setQuickOrderInput('')
    setIsSubmitting(false)
    setIsChecklistOrder(false)

    toast({
      title: `${orderName} 오더를 생성하였습니다`,
    })

    if (!isSubscriptionReady) refresh()
  }

  const handleSubmit = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    // '체중' 입력 -> '체중중' 오류
    if (e.nativeEvent.isComposing || e.key !== 'Enter') return
    if (!quickOrderInput) return

    const [orderName, orderDescription] = quickOrderInput.split('$')

    // 체크리스트 INPUT을 입력했을 경우
    if (CHECKLIST_ORDER_NAMES.some((name) => name.includes(orderName))) {
      setIsChecklistOrder(true)
      setOrderType('checklist')
      setQuickOrderInput('')
      return
    }

    setIsSubmitting(true)
    await createOrder(orderName, orderDescription ?? '')
  }

  // 체크리스트 SELECT onChange
  const handleSelectChange = async (selectedValue: string) => {
    const selectedOrder = CHECKLIST_ORDERS.find(
      (order) => order.orderName === selectedValue,
    )

    if (selectedOrder) {
      const formattedInput = `${selectedOrder.orderName}$${selectedOrder.orderComment}`
      setQuickOrderInput(formattedInput)

      await createOrder(
        selectedOrder.orderName,
        selectedOrder.orderComment || '',
      )
    }
  }

  return (
    <div className="relative hidden items-center md:flex">
      <Select
        onValueChange={(value) => {
          setOrderType(value)
          setIsChecklistOrder(false)
        }}
        value={orderType}
      >
        <SelectTrigger
          className="h-11 w-1/2 rounded-none border-0 shadow-none ring-0 focus:ring-0"
          style={{
            backgroundColor: orderColorsData[orderType as keyof IcuOrderColors],
          }}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="p-0">
          {DEFAULT_ICU_ORDER_TYPE.map((item) => (
            <SelectItem
              key={item.value}
              value={item.value}
              style={{
                backgroundColor: orderColorsData[item.value],
              }}
              className="rounded-none p-1 transition hover:opacity-70"
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {orderType === 'checklist' ? (
        <Select onValueChange={handleSelectChange}>
          <SelectTrigger className="h-11 rounded-none border-b-0 border-l-0 border-t-0 focus-visible:ring-0">
            <SelectValue placeholder="체크리스트 항목 선택" />
          </SelectTrigger>

          <SelectContent>
            {CHECKLIST_ORDERS.map((order) => (
              <SelectItem key={order.orderName} value={order.orderName}>
                {order.orderName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <div className="relative w-full">
          <Input
            className={cn(
              'h-11 rounded-none border-b-0 border-l-0 border-t-0 focus-visible:ring-0',
              isChecklistOrder && 'ring-1 ring-destructive',
            )}
            disabled={isSubmitting}
            placeholder={QUICKORDER_PLACEHOLDER[orderType as OrderType]}
            value={isSubmitting ? '' : quickOrderInput}
            onChange={(e) => setQuickOrderInput(e.target.value)}
            onKeyDown={handleSubmit}
          />
        </div>
      )}
      {isChecklistOrder && (
        <span className="absolute -bottom-5 right-3 text-xs text-destructive">
          해당 오더는 체크리스트에 존재합니다
        </span>
      )}
    </div>
  )
}
