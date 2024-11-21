'use client'

import DeleteOrderAlertDialog from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/delete-order-alert-dialog'
import DrugFormField from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order-form/drug-order/drug-form-field'
import OrderFormField from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order-form/order-form-field'
import { orderSchema } from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order-form/order-schema'
import OrderTimeSettings from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order-time-settings'
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
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { toast } from '@/components/ui/use-toast'
import { DEFAULT_ICU_ORDER_TYPE } from '@/constants/hospital/icu/chart/order'
import { upsertOrder } from '@/lib/services/icu/chart/order-mutation'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function OrderForm({ icuChartId }: { icuChartId?: string }) {
  const { hos_id } = useParams()
  const { toggleModal, selectedChartOrder, isEditMode, resetState } =
    useIcuOrderStore()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [startTime, setStartTime] = useState<string>('undefined')
  const [timeTerm, setTimeTerm] = useState<string>('undefined')
  const [orderTime, setOrderTime] = useState<string[]>(
    selectedChartOrder.order_times || new Array(24).fill('0'),
  )

  const form = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      icu_chart_order_type: selectedChartOrder.order_type ?? undefined,
      icu_chart_order_name: selectedChartOrder.order_name ?? undefined,
      icu_chart_order_comment: selectedChartOrder.order_comment ?? undefined,
    },
  })

  const orderType = form.watch('icu_chart_order_type')

  const handleSubmit = async (values: z.infer<typeof orderSchema>) => {
    setIsSubmitting(true)

    const trimmedOrderName = values.icu_chart_order_name.trim()
    const orderComment = values.icu_chart_order_comment ?? ''
    const orderType = values.icu_chart_order_type

    await upsertOrder(
      hos_id as string,
      icuChartId!,
      selectedChartOrder.order_id!,
      orderTime,
      {
        icu_chart_order_name: trimmedOrderName,
        icu_chart_order_comment: orderComment,
        icu_chart_order_type: orderType,
      },
    )

    toast({
      title: `${values.icu_chart_order_name} 오더를 추가하였습니다`,
    })

    resetState()
    toggleModal()
    setIsSubmitting(false)
  }

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
                  disabled={
                    isEditMode && selectedChartOrder.order_type === 'injection'
                  }
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

        {orderType === 'injection' ? (
          <DrugFormField
            form={form}
            // drugs={drugs}
            // weight={weight}
            // species={species}
          />
        ) : (
          <OrderFormField form={form} />
        )}

        <OrderTimeSettings
          startTime={startTime}
          timeTerm={timeTerm}
          orderTime={orderTime}
          setStartTime={setStartTime}
          setTimeTerm={setTimeTerm}
          setOrderTime={setOrderTime}
        />

        <DialogFooter className="ml-auto w-full gap-2 md:gap-0">
          {isEditMode && (
            <DeleteOrderAlertDialog
              selectedChartOrder={selectedChartOrder}
              toggleModal={toggleModal}
            />
          )}

          <DialogClose asChild>
            <Button type="button" variant="outline" tabIndex={-1}>
              닫기
            </Button>
          </DialogClose>

          <Button type="submit" disabled={isSubmitting}>
            {isEditMode ? '변경' : '추가'}
            <LoaderCircle
              className={cn(isSubmitting ? 'ml-2 animate-spin' : 'hidden')}
            />
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
