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
import { DEFAULT_ICU_ORDER_TYPE } from '@/constants/hospital/icu/chart/order'
import { upsertOrder } from '@/lib/services/icu/chart/order-mutation'
import { useRealtimeSubscriptionStore } from '@/lib/store/icu/realtime-subscription'
import { IcuOrderColors } from '@/types/adimin'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { useParams, useRouter } from 'next/navigation'
import React, { Dispatch, SetStateAction, useState } from 'react'

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

  const handleSubmit = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!quickOrderInput) return

    const [orderName, orderDescription] = quickOrderInput.split('$')

    if (e.key === 'Enter') {
      setIsSubmitting(true)

      setSortedOrders((prev) => [
        ...prev,
        {
          id: 1,
          order_id: `temp_order_id_${new Date().getTime()}`,
          order_name: orderName.trim(),
          order_comment: orderDescription ? orderDescription.trim() : '',
          order_type: orderType,
          order_times: Array(24).fill('0'),
          treatments: [],
        },
      ])

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

      toast({
        title: `${quickOrderInput.split('$')[0]} 오더를 생성하였습니다`,
      })

      setQuickOrderInput('')
      setIsSubmitting(false)

      if (!isSubscriptionReady) refresh()
    }
  }
  return (
    <div className="flex items-center">
      <Select onValueChange={setOrderType} value={orderType}>
        <SelectTrigger
          className="h-11 w-1/2 rounded-none border-0 shadow-none ring-0 focus:ring-0"
          style={{
            backgroundColor: orderColorsData[orderType as keyof IcuOrderColors],
          }}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="p-0">
          {DEFAULT_ICU_ORDER_TYPE.filter(
            (item) => item.value !== 'checklist',
          ).map((item) => (
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

      <Input
        className="h-11 rounded-none border-b-0 border-l-0 border-t-0 focus-visible:ring-0"
        disabled={isSubmitting}
        placeholder="빠른 오더 (오더명$오더설명)"
        value={isSubmitting ? '' : quickOrderInput}
        onChange={(e) => setQuickOrderInput(e.target.value)}
        onKeyDown={handleSubmit}
      />
    </div>
  )
}
