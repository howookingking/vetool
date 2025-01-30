'use no memo'

import OrderBorderCheckbox from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/order-border-checkbox'
import OrderFormField from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/order-form-field'
import { Button } from '@/components/ui/button'
import { DialogClose, DialogFooter } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { toast } from '@/components/ui/use-toast'
import { orderSchema } from '@/lib/schemas/icu/chart/order-schema'
import { upsertDefaultChartOrder } from '@/lib/services/admin/icu/default-orders'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { cn } from '@/lib/utils/utils'
import { type SelectedIcuOrder } from '@/types/icu/chart'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import DtDeleteOrderAlertDialog from './dt-delete-order-alert-dialog'

type DtOrderFormProps = {
  setSortedOrders: Dispatch<SetStateAction<SelectedIcuOrder[]>>
  template?: boolean
}

export default function DtOrderForm({
  setSortedOrders,
  template,
}: DtOrderFormProps) {
  const { hos_id } = useParams()
  const { refresh } = useRouter()

  const { setOrderStep, selectedChartOrder, reset } = useIcuOrderStore()
  const form = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      icu_chart_order_type: selectedChartOrder.order_type,
      icu_chart_order_name: selectedChartOrder.order_name,
      icu_chart_order_comment: selectedChartOrder.order_comment ?? '',
      is_bordered: selectedChartOrder.is_bordered ?? false,
    },
  })

  const [isUpdating, setIsUpdating] = useState(false)

  const handleSubmit = async (values: z.infer<typeof orderSchema>) => {
    setIsUpdating(true)
    const trimmedOrderName = values.icu_chart_order_name.trim()
    const orderComment = values.icu_chart_order_comment ?? ''
    const orderType = values.icu_chart_order_type
    const isBordered = values.is_bordered

    template
      ? setSortedOrders((prev) => {
          return prev.map((order) => {
            if (order.order_id === selectedChartOrder.order_id) {
              return {
                ...order,
                order_name: trimmedOrderName,
                order_comment: orderComment,
                order_type: orderType,
                is_bordered: isBordered ?? false,
              }
            }
            return order
          })
        })
      : await upsertDefaultChartOrder(
          hos_id as string,
          selectedChartOrder.order_id,
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
            selectedChartOrder={selectedChartOrder}
            setOrderStep={setOrderStep}
            setSortedOrders={setSortedOrders}
            template={template}
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
