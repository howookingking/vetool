'use client'

import SubmitButton from '@/components/common/submit-button'
import UserAvatar from '@/components/hospital/common/user-avatar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ordererSchema } from '@/lib/schemas/icu/chart/order-schema'
import { upsertOrder } from '@/lib/services/icu/chart/order-mutation'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { cn, formatOrders } from '@/lib/utils/utils'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import type { SelectedIcuChart, SelectedIcuOrder } from '@/types/icu/chart'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

type Props = {
  icuChartId: SelectedIcuChart['icu_chart_id']
  mainVetName: SelectedIcuChart['main_vet']['name']
  orders: SelectedIcuOrder[]
  isSetting?: boolean
}

export default function OrdererSelectStep({
  icuChartId,
  mainVetName,
  orders,
  isSetting,
}: Props) {
  const { hos_id } = useParams()

  const {
    basicHosData: { vetList },
  } = useBasicHosDataContext()
  const {
    reset,
    selectedChartOrder: {
      is_bordered,
      icu_chart_order_comment,
      icu_chart_order_name,
      icu_chart_order_id,
      icu_chart_order_type,
      icu_chart_order_time,
    },
    orderTimePendingQueue,
    copiedOrderPendingQueue,
    setOrderStep,
  } = useIcuOrderStore()

  const [isUpdating, setIsUpdating] = useState(false)

  const okButtonRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (okButtonRef.current) {
      okButtonRef.current.focus()
    }
  }, [])

  const form = useForm<z.infer<typeof ordererSchema>>({
    resolver: zodResolver(ordererSchema),
    defaultValues: {
      orderer: mainVetName,
    },
  })

  const handleUpsertSingleTx = async (
    values: z.infer<typeof ordererSchema>,
  ) => {
    setIsUpdating(true)

    await upsertOrder(
      hos_id as string,
      icuChartId,
      icu_chart_order_id!,
      icu_chart_order_time!.map((time) =>
        time === '1' ? values.orderer : time,
      ),
      {
        icu_chart_order_name: icu_chart_order_name!,
        icu_chart_order_comment: icu_chart_order_comment!,
        icu_chart_order_type: icu_chart_order_type!,
        is_bordered: is_bordered!,
      },
    )

    toast.success(
      `${icu_chart_order_name!.split('#')[0]} 오더를 수정하였습니다`,
    )

    reset()
    setOrderStep('closed')
    setIsUpdating(false)
  }

  const handleUpsertMultipleTxs = async (
    values: z.infer<typeof ordererSchema>,
  ) => {
    setIsUpdating(true)
    const formattedOrders = formatOrders(orderTimePendingQueue)

    for (const order of formattedOrders) {
      const currentOrder = orders.find(
        (o) => o.icu_chart_order_id === order.orderId,
      )!

      const updatedOrderTimes = [...currentOrder.icu_chart_order_time]
      for (const time of order.orderTimes) {
        updatedOrderTimes[time] =
          updatedOrderTimes[time] === '0' ? values.orderer : '0'
      }

      await upsertOrder(
        hos_id as string,
        icuChartId,
        order.orderId,
        updatedOrderTimes,
        {
          icu_chart_order_name: currentOrder.icu_chart_order_name,
          icu_chart_order_comment: currentOrder.icu_chart_order_comment,
          icu_chart_order_type: currentOrder.icu_chart_order_type,
          is_bordered: currentOrder.is_bordered,
        },
      )
    }

    toast.success('오더시간을 변경하였습니다')

    reset()
    setOrderStep('closed')
    setIsUpdating(false)
  }

  const handleUpsertOrder = async (values: z.infer<typeof ordererSchema>) => {
    setIsUpdating(true)
    for (const order of copiedOrderPendingQueue) {
      const updatedOrderTimes = [...order.icu_chart_order_time!]

      order.icu_chart_order_time!.forEach((time, index) => {
        updatedOrderTimes[index] = time === '0' ? '0' : values.orderer
      })

      await upsertOrder(
        hos_id as string,
        icuChartId,
        undefined,
        updatedOrderTimes,
        {
          icu_chart_order_name: order.icu_chart_order_name!,
          icu_chart_order_comment: order.icu_chart_order_comment!,
          icu_chart_order_type: order.icu_chart_order_type!,
          is_bordered: order.is_bordered!,
        },
      )
    }

    toast.success('오더를 붙여넣었습니다')

    reset()
    setOrderStep('closed')
    setIsUpdating(false)
  }

  const isSingleTx = orderTimePendingQueue.length === 0
  const isPendingOrder = copiedOrderPendingQueue.length > 0

  const handleSubmit = async (values: z.infer<typeof ordererSchema>) => {
    if (isSingleTx && !isPendingOrder) {
      await handleUpsertSingleTx(values)
    }
    if (!isSingleTx && !isPendingOrder) {
      await handleUpsertMultipleTxs(values)
    }

    if (isPendingOrder) {
      await handleUpsertOrder(values)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="orderer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>오더결정 수의사</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={mainVetName}
                disabled={isUpdating || isSetting}
              >
                <FormControl>
                  <SelectTrigger
                    className={cn(
                      'h-8 text-sm',
                      !field.value && 'text-muted-foreground',
                    )}
                  >
                    <SelectValue placeholder="수의사를 선택해주세요" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {vetList.map((vet) => (
                    <SelectItem
                      key={vet.user_id}
                      value={vet.name}
                      className="w-full"
                    >
                      <div className="flex items-center gap-2">
                        {vet.avatar_url && (
                          <UserAvatar src={vet.avatar_url} alt={vet.name} />
                        )}
                        <span>{vet.name}</span>
                        {vet.position && (
                          <span className="text-xs">({vet.position})</span>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <SubmitButton
          isPending={isUpdating || !!isSetting}
          buttonText={'확인'}
        />
      </form>
    </Form>
  )
}
