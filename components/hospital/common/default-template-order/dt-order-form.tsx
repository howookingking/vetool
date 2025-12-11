'use no memo'

import SubmitButton from '@/components/common/submit-button'
import OrderBorderCheckbox from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/order-border-checkbox'
import OrderFormField from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/order-form-field'
import { Button } from '@/components/ui/button'
import { DialogClose, DialogFooter } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { orderSchema } from '@/lib/schemas/icu/chart/order-schema'
import { upsertDefaultChartOrder } from '@/lib/services/admin/icu/default-orders'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import DtDeleteOrderAlertDialog from './dt-delete-order-alert-dialog'

type Props = {
  setSortedOrders: Dispatch<SetStateAction<SelectedIcuOrder[]>>
  isTemplate?: boolean
  isLastDefaultOrder?: boolean
  hosId: string
  order: SelectedIcuOrder
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}

export default function DtOrderForm({
  setSortedOrders,
  isTemplate,
  isLastDefaultOrder,
  hosId,
  order,
  setIsDialogOpen,
}: Props) {
  const { refresh } = useRouter()

  const [isUpdating, setIsUpdating] = useState(false)

  const form = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      icu_chart_order_type: order.icu_chart_order_type,
      icu_chart_order_name: order.icu_chart_order_name,
      icu_chart_order_comment: order.icu_chart_order_comment ?? '',
      is_bordered: order.is_bordered ?? false,
    },
  })

  const handleSubmit = async (values: z.infer<typeof orderSchema>) => {
    setIsUpdating(true)

    const trimmedOrderName = values.icu_chart_order_name.trim()
    const orderComment = values.icu_chart_order_comment
      ? values.icu_chart_order_comment.trim()
      : ''
    const orderType = values.icu_chart_order_type
    const isBordered = values.is_bordered

    setSortedOrders((prev) => {
      const updatedOrders = prev.map((o) => {
        if (o.icu_chart_order_id === order.icu_chart_order_id) {
          return {
            ...o,
            icu_chart_order_name: trimmedOrderName,
            icu_chart_order_comment: orderComment,
            icu_chart_order_type: orderType,
            is_bordered: isBordered ?? false,
            icu_chart_order_time: order.icu_chart_order_time,
          }
        }
        return o
      })
      return updatedOrders
    })

    if (!isTemplate) {
      await upsertDefaultChartOrder(
        hosId,
        order.icu_chart_order_id,
        order.icu_chart_order_time,
        {
          icu_chart_order_name: trimmedOrderName,
          icu_chart_order_comment: orderComment,
          icu_chart_order_type: orderType,
          is_bordered: isBordered,
        },
      )
      toast.success('오더을 수정하였습니다')
    }

    setIsUpdating(false)
    setIsDialogOpen(false)
    !isTemplate && setTimeout(refresh, 100)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-4"
      >
        <OrderFormField form={form} />

        <OrderBorderCheckbox form={form} />

        <DialogFooter className="ml-auto w-full gap-2 md:gap-0">
          <DtDeleteOrderAlertDialog
            order={order}
            setIsDialogOpen={setIsDialogOpen}
            setSortedOrders={setSortedOrders}
            isTemplate={isTemplate}
            isLastDefaultOrder={isLastDefaultOrder}
          />

          <DialogClose asChild>
            <Button type="button" variant="outline" tabIndex={-1}>
              닫기
            </Button>
          </DialogClose>

          <SubmitButton buttonText="확인" isPending={isUpdating} />
        </DialogFooter>
      </form>
    </Form>
  )
}
