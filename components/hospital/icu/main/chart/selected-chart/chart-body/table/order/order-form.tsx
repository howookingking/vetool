'use no memo'

import DeleteOrderAlertDialog from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/delete-order-alert-dialog'
import OrderBorderCheckbox from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/order-border-checkbox'
import OrderFormField from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/order-form-field'
import OrderTimeSettings from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/order-time-settings'
import { Button } from '@/components/ui/button'
import { DialogClose, DialogFooter } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { toast } from '@/components/ui/use-toast'
import { orderSchema } from '@/lib/schemas/icu/chart/order-schema'
import { upsertOrder } from '@/lib/services/icu/chart/order-mutation'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { cn } from '@/lib/utils/utils'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import { type SelectedIcuOrder } from '@/types/icu/chart'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { useParams } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type OrderFormProps = {
  showOrderer: boolean
  icuChartId: string
  setSortedOrders: Dispatch<SetStateAction<SelectedIcuOrder[]>>
}

export default function OrderForm({
  showOrderer,
  icuChartId,
  setSortedOrders,
}: OrderFormProps) {
  const { hos_id } = useParams()
  const { setOrderStep, selectedChartOrder, setSelectedChartOrder, reset } =
    useIcuOrderStore()
  const {
    basicHosData: { vetsListData },
  } = useBasicHosDataContext()

  const [isUpdating, setIsUpdating] = useState(false)
  const [startTime, setStartTime] = useState<string>('undefined')
  const [timeTerm, setTimeTerm] = useState<string>('undefined')
  const [orderTime, setOrderTime] = useState<string[]>(
    selectedChartOrder.order_times || new Array(24).fill('0'),
  )

  const form = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      icu_chart_order_type: selectedChartOrder.order_type,
      icu_chart_order_name: selectedChartOrder.order_name,
      icu_chart_order_comment: selectedChartOrder.order_comment ?? '',
      is_bordered: selectedChartOrder.is_bordered ?? false,
    },
  })

  const handleNextStep = async (values: z.infer<typeof orderSchema>) => {
    setSelectedChartOrder({
      order_name: values.icu_chart_order_name,
      order_comment: values.icu_chart_order_comment,
      order_type: values.icu_chart_order_type,
      order_times: orderTime,
      order_id: selectedChartOrder.order_id,
      is_bordered: values.is_bordered,
    })
    setOrderStep('selectOrderer')
  }
  const handleSubmitWithoutOrderer = async (
    values: z.infer<typeof orderSchema>,
  ) => {
    setIsUpdating(true)

    await upsertOrder(
      hos_id as string,
      icuChartId,
      selectedChartOrder.order_id,
      orderTime.map((time) => (time === '0' ? '0' : vetsListData[0].name)),
      {
        icu_chart_order_name: values.icu_chart_order_name.trim(),
        icu_chart_order_comment: values.icu_chart_order_comment
          ? values.icu_chart_order_comment.trim()
          : '',
        icu_chart_order_type: values.icu_chart_order_type!,
        is_bordered: values.is_bordered,
      },
    )
    toast({
      title: '오더를 수정 하였습니다',
    })

    reset()
    setOrderStep('closed')
    setIsUpdating(false)
  }

  const handleSubmit = showOrderer ? handleNextStep : handleSubmitWithoutOrderer

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

        <OrderTimeSettings
          startTime={startTime}
          timeTerm={timeTerm}
          orderTime={orderTime}
          setStartTime={setStartTime}
          setTimeTerm={setTimeTerm}
          setOrderTime={setOrderTime}
        />

        <OrderBorderCheckbox form={form} />

        <DialogFooter className="ml-auto w-full gap-2 md:gap-0">
          <DeleteOrderAlertDialog
            selectedChartOrder={selectedChartOrder}
            setOrderStep={setOrderStep}
            setSortedOrders={setSortedOrders}
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
