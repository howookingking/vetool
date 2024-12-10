'use client'

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
  CHECKLIST_ORDERS,
  DEFAULT_ICU_ORDER_TYPE,
  CHECKLIST_ORDER_NAMES,
} from '@/constants/hospital/icu/chart/order'
import { upsertOrder } from '@/lib/services/icu/chart/order-mutation'
import { useRealtimeSubscriptionStore } from '@/lib/store/icu/realtime-subscription'
import { cn } from '@/lib/utils/utils'
import { IcuOrderColors } from '@/types/adimin'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { useParams, useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useState } from 'react'

export default function QuickOrderInsertInput({
  icuChartId,
  setSortedOrders,
  orderColorsData,
}: {
  icuChartId: string
  setSortedOrders: Dispatch<SetStateAction<SelectedIcuOrder[]>>
  orderColorsData: IcuOrderColors
}) {
  const { hos_id } = useParams()
  const { refresh } = useRouter()
  const { isSubscriptionReady } = useRealtimeSubscriptionStore()

  const [quickOrderInput, setQuickOrderInput] = useState('')
  const [orderType, setOrderType] = useState('manual')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isChecklistInput, setIsChecklistInput] = useState(false)
  const [isSelectOpen, setIsSelectOpen] = useState(false)

  const quickOrderPlaceholder = (() => {
    switch (orderType) {
      case 'fluid':
        return '빠른 오더 (수액명$수액 속도)'
      case 'feed':
        return '빠른 오더 (사료명$회당 급여량)'
      default:
        return '빠른 오더 (오더명$오더 설명)'
    }
  })()

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
    setIsChecklistInput(false)
    setIsSelectOpen(false)

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
      setIsChecklistInput(true)
      setIsSelectOpen(true)
      return
    }

    setIsSubmitting(true)
    await createOrder(orderName, orderDescription || '')
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
    <div className="hidden items-center md:flex">
      <Select
        onValueChange={(value) => {
          setOrderType(value)
          setIsChecklistInput(false)
        }}
        value={orderType}
        open={isSelectOpen}
        onOpenChange={setIsSelectOpen}
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
              isChecklistInput && 'ring-1 ring-destructive',
            )}
            disabled={isSubmitting}
            placeholder={quickOrderPlaceholder}
            value={isSubmitting ? '' : quickOrderInput}
            onChange={(e) => setQuickOrderInput(e.target.value)}
            onKeyDown={handleSubmit}
          />

          {isChecklistInput && (
            <span className="absolute -bottom-6 left-2 text-destructive">
              해당 타입을 체크리스트로 선택해주세요
            </span>
          )}
        </div>
      )}
    </div>
  )
}
