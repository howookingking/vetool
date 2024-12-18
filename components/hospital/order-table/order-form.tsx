'use client'

import ChecklistOrderField from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/checklist-order/checklist-order-field'
import FeedOrderField from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/feed-order/feed-order-field'
import FluidOrderField from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/fluid-order/fluid-order-field'
import OrderBorderCheckbox from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/order-border-checkbox'
import OrderFormField from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/order-form-field'
import { orderSchema } from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/order-schema'
import DeleteOrderAlertDialog from '@/components/hospital/order-table/delete-order-alert-dialog'
import { Button } from '@/components/ui/button'
import { DialogClose, DialogFooter } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/components/ui/use-toast'
import { DEFAULT_ICU_ORDER_TYPE } from '@/constants/hospital/icu/chart/order'
import { upsertDefaultChartOrder } from '@/lib/services/admin/icu/default-orders'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { useTemplateStore } from '@/lib/store/icu/template'
import { cn } from '@/lib/utils/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function OrderForm({
  mode,
}: {
  mode: 'default' | 'addTemplate' | 'editTemplate'
}) {
  const { hos_id } = useParams()
  const { refresh } = useRouter()
  const { setOrderStep, selectedChartOrder, isEditOrderMode, reset } =
    useIcuOrderStore()
  const { addTemplateOrder, updateTemplateOrder, orderIndex } =
    useTemplateStore()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      icu_chart_order_type: selectedChartOrder.order_type ?? undefined,
      icu_chart_order_name: selectedChartOrder.order_name ?? '',
      icu_chart_order_comment: selectedChartOrder.order_comment ?? '',
      is_bordered: selectedChartOrder.is_bordered ?? false,
    },
  })

  const orderType = form.watch('icu_chart_order_type')

  const handleSubmit = useCallback(
    async (values: z.infer<typeof orderSchema>) => {
      setIsSubmitting(true)

      const trimmedOrderName = values.icu_chart_order_name.trim()
      const orderComment = values.icu_chart_order_comment ?? ''
      const orderType = values.icu_chart_order_type
      const isBordered = values.is_bordered
      const updatedOrder = {
        order_name: trimmedOrderName,
        order_comment: orderComment,
        order_type: orderType,
        id: 999,
        is_bordered: isBordered,
      }

      if (mode === 'default') {
        await upsertDefaultChartOrder(
          hos_id as string,
          selectedChartOrder.order_id,
          {
            default_chart_order_name: trimmedOrderName,
            default_chart_order_comment: orderComment,
            default_chart_order_type: orderType,
            is_bordered: isBordered,
          },
        )

        setOrderStep('closed')
      }

      if (isEditOrderMode) {
        updateTemplateOrder(updatedOrder, orderIndex)
        setOrderStep('closed')
      } else {
        addTemplateOrder(updatedOrder)

        if (mode === 'editTemplate') {
          setOrderStep('closed')
        }
      }

      refresh()

      toast({
        title: `오더를 추가하였습니다`,
      })

      form.resetField('icu_chart_order_name')
      form.resetField('icu_chart_order_comment')
      reset()
      setIsSubmitting(false)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      hos_id,
      selectedChartOrder.order_id,
      refresh,
      reset,
      setOrderStep,
      mode,
      isEditOrderMode,
      orderIndex,
      addTemplateOrder,
      updateTemplateOrder,
    ],
  )

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col space-y-4"
      >
        <FormField
          control={form.control}
          name="icu_chart_order_type"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="font-semibold">오더 타입*</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-wrap gap-4"
                >
                  {DEFAULT_ICU_ORDER_TYPE.map((item) => (
                    <FormItem
                      key={item.value}
                      className="flex items-center space-x-1 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={item.value} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {item.label}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {orderType === 'checklist' && <ChecklistOrderField form={form} />}

        {orderType === 'fluid' && <FluidOrderField form={form} />}

        {orderType === 'feed' && (
          <FeedOrderField
            hosId={hos_id as string}
            form={form}
            orderTime={new Array(24).fill('0')}
          />
        )}

        {orderType !== 'fluid' &&
          orderType !== 'feed' &&
          orderType !== 'checklist' && <OrderFormField form={form} />}

        <Separator />

        <OrderBorderCheckbox form={form} />

        <DialogFooter className="ml-auto w-full gap-2 md:gap-0">
          {isEditOrderMode && (
            <DeleteOrderAlertDialog
              selectedChartOrder={selectedChartOrder}
              setOrderStep={setOrderStep}
              mode={mode}
            />
          )}

          <DialogClose asChild>
            <Button type="button" variant="outline" tabIndex={-1}>
              닫기
            </Button>
          </DialogClose>

          <Button type="submit" disabled={isSubmitting}>
            {isEditOrderMode ? '변경' : '추가'}
            <LoaderCircle
              className={cn(isSubmitting ? 'ml-2 animate-spin' : 'hidden')}
            />
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
