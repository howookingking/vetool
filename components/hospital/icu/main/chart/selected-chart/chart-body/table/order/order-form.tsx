'use no memo'

import SubmitButton from '@/components/common/submit-button'
import DeleteOrderAlertDialog from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/delete-order-alert-dialog'
import OrderBorderCheckbox from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/order-border-checkbox'
import OrderFormField from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/order-form-field'
import OrderTimeSettings from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/order-time-settings'
import { Button } from '@/components/ui/button'
import { DialogClose, DialogFooter } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { orderSchema } from '@/lib/schemas/icu/chart/order-schema'
import { upsertOrder } from '@/lib/services/icu/chart/order-mutation'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import type { SelectedIcuChart, SelectedIcuOrder } from '@/types/icu/chart'
import { zodResolver } from '@hookform/resolvers/zod'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type Props = {
  hosId: string
  icuChartId: SelectedIcuChart['icu_chart_id']
  setSortedOrders: Dispatch<SetStateAction<SelectedIcuOrder[]>>
}

export default function OrderForm({
  hosId,
  icuChartId,
  setSortedOrders,
}: Props) {
  const { setOrderStep, selectedChartOrder, setSelectedChartOrder, reset } =
    useIcuOrderStore()
  const {
    basicHosData: { vetList, showOrderer },
  } = useBasicHosDataContext()

  const [isUpdating, setIsUpdating] = useState(false)
  const [orderTime, setOrderTime] = useState<string[]>(
    selectedChartOrder.icu_chart_order_time || new Array(24).fill('0'),
  )

  const form = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      icu_chart_order_type: selectedChartOrder.icu_chart_order_type,
      icu_chart_order_name: selectedChartOrder.icu_chart_order_name,
      icu_chart_order_comment: selectedChartOrder.icu_chart_order_comment ?? '',
      is_bordered: selectedChartOrder.is_bordered ?? false,
    },
  })

  const handleNextStep = async (values: z.infer<typeof orderSchema>) => {
    const {
      icu_chart_order_name,
      icu_chart_order_type,
      icu_chart_order_comment,
      is_bordered,
    } = values

    setSelectedChartOrder({
      icu_chart_order_name: icu_chart_order_name,
      icu_chart_order_comment: icu_chart_order_comment,
      icu_chart_order_type: icu_chart_order_type,
      icu_chart_order_time: orderTime,
      icu_chart_order_id: selectedChartOrder.icu_chart_order_id,
      is_bordered: is_bordered,
    })

    setOrderStep('selectOrderer')
  }

  const handleSubmitWithoutOrderer = async (
    values: z.infer<typeof orderSchema>,
  ) => {
    const {
      icu_chart_order_name,
      icu_chart_order_type,
      icu_chart_order_comment,
      is_bordered,
    } = values

    setIsUpdating(true)

    await upsertOrder(
      hosId,
      icuChartId,
      selectedChartOrder.icu_chart_order_id,
      orderTime.map((time) => (time === '0' ? '0' : vetList[0].name)),
      {
        icu_chart_order_name: icu_chart_order_name.trim(),
        icu_chart_order_comment: icu_chart_order_comment
          ? icu_chart_order_comment.trim()
          : '',
        icu_chart_order_type: icu_chart_order_type,
        is_bordered: is_bordered,
      },
    )

    toast.success('오더를 수정하였습니다')

    reset()
    setOrderStep('closed')
    setIsUpdating(false)
  }

  const handleSubmit = showOrderer ? handleNextStep : handleSubmitWithoutOrderer

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-4"
      >
        <OrderFormField form={form} />

        <OrderTimeSettings orderTime={orderTime} setOrderTime={setOrderTime} />

        <div className="mt-2">
          <OrderBorderCheckbox form={form} />
        </div>

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

          <SubmitButton isPending={isUpdating} buttonText="확인" />
        </DialogFooter>
      </form>
    </Form>
  )
}
