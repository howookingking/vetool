'use no memo'

import OrderBorderCheckbox from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/order-border-checkbox'
import OrderFormField from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/order-form-field'
import { Button } from '@/components/ui/button'
import { DialogClose, DialogFooter } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { toast } from '@/components/ui/use-toast'
import { type OrderType } from '@/constants/hospital/icu/chart/order'
import { orderSchema } from '@/lib/schemas/icu/chart/order-schema'
import { upsertDefaultChartOrder } from '@/lib/services/admin/icu/default-orders'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { cn } from '@/lib/utils/utils'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import OrderTimeSettings from '../../icu/main/chart/selected-chart/chart-body/table/order/order-time-settings'
import DtDeleteOrderAlertDialog from './dt-delete-order-alert-dialog'

type Props = {
  setSortedOrders: Dispatch<SetStateAction<SelectedIcuOrder[]>>
  isTemplate?: boolean
  isLastDefaultOrder?: boolean
}

export default function DtOrderForm({
  setSortedOrders,
  isTemplate,
  isLastDefaultOrder,
}: Props) {
  const { hos_id } = useParams()
  const { refresh } = useRouter()

  const { setOrderStep, selectedChartOrder, reset } = useIcuOrderStore()
  const {
    basicHosData: { baselineTime },
  } = useBasicHosDataContext()

  const [startTime, setStartTime] = useState<string>('0')
  const [timeTerm, setTimeTerm] = useState<string>('undefined')
  const [orderTime, setOrderTime] = useState<string[]>(
    selectedChartOrder.order_times || new Array(24).fill('0'),
  )
  const [isUpdating, setIsUpdating] = useState(false)

  const form = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      icu_chart_order_type: selectedChartOrder.order_type,
      icu_chart_order_name: selectedChartOrder.order_name,
      icu_chart_order_comment: selectedChartOrder.order_comment ?? '',
      is_bordered: selectedChartOrder.is_bordered ?? false,
    },
  })

  const handleSubmit = async (values: z.infer<typeof orderSchema>) => {
    setIsUpdating(true)
    const trimmedOrderName = values.icu_chart_order_name.trim()
    const orderComment = values.icu_chart_order_comment ?? ''
    const orderType = values.icu_chart_order_type
    const isBordered = values.is_bordered

    isTemplate
      ? setSortedOrders((prev) => {
          return prev.map((order) => {
            if (order.order_id === selectedChartOrder.order_id) {
              return {
                ...order,
                order_name: trimmedOrderName,
                order_comment: orderComment,
                order_type: orderType as OrderType,
                is_bordered: isBordered ?? false,
              }
            }
            return order
          })
        })
      : await upsertDefaultChartOrder(
          hos_id as string,
          selectedChartOrder.order_id,
          orderTime.map((time) => (time === '0' ? '0' : '1')),
          {
            default_chart_order_name: trimmedOrderName,
            default_chart_order_comment: orderComment,
            default_chart_order_type: orderType,
            is_bordered: isBordered,
          },
        )

    toast({
      title: '오더를 수정 하였습니다',
    })

    reset()
    setOrderStep('closed')
    setIsUpdating(false)
    refresh()
  }

  const newTime = new Array(24)
    .fill(0)
    .map((_, i) => (Number(baselineTime) + i) % 24)

  useEffect(() => {
    if (startTime !== 'undefined' && timeTerm !== 'undefined') {
      const start = Number(startTime)

      const term = Number(timeTerm)
      const newOrderTime = Array(24).fill('0')

      for (let i = start - 1; i < 24; i += term) {
        newOrderTime[i] = '1'
      }

      setOrderTime(newOrderTime)
    }
  }, [form, startTime, timeTerm])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-4"
      >
        <OrderFormField form={form} />

        <OrderBorderCheckbox form={form} />

        <OrderTimeSettings
          startTime={startTime}
          timeTerm={timeTerm}
          orderTime={orderTime}
          setStartTime={setStartTime}
          setTimeTerm={setTimeTerm}
          setOrderTime={setOrderTime}
          newTime={newTime}
        />

        <DialogFooter className="ml-auto w-full gap-2 md:gap-0">
          <DtDeleteOrderAlertDialog
            selectedChartOrder={selectedChartOrder}
            setOrderStep={setOrderStep}
            setSortedOrders={setSortedOrders}
            isTemplate={isTemplate}
            isLastDefaultOrder={isLastDefaultOrder}
          />

          <DialogClose asChild>
            <Button type="button" variant="outline" tabIndex={-1}>
              닫기
            </Button>
          </DialogClose>

          <Button type="submit" disabled={isUpdating}>
            확인
            <LoaderCircle
              className={cn(isUpdating ? 'animate-spin' : 'hidden')}
            />
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
