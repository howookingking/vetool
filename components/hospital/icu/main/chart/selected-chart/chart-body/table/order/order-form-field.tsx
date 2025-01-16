import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { DEFAULT_ORDER_LABEL } from '@/constants/hospital/icu/chart/order'
import { orderSchema } from '@/lib/schemas/icu/chart/order-schema'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

export default function OrderFormField({
  form,
  orderLabel,
}: {
  form: UseFormReturn<z.infer<typeof orderSchema>>
  orderLabel: string
}) {
  return (
    <>
      <FormField
        control={form.control}
        name="icu_chart_order_name"
        render={({ field }) => (
          <FormItem className="w-full space-y-2">
            <FormLabel className="font-semibold">
              {orderLabel} 오더명 <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <Input
                placeholder={`${'오더에 대한 이름을 입력해주세요'}`}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="icu_chart_order_comment"
        render={({ field }) => (
          <FormItem className="w-full space-y-2">
            <FormLabel className="font-semibold">
              {orderLabel} 오더 설명
            </FormLabel>
            <FormControl>
              <Input
                placeholder={`${'오더에 대한 설명을 입력해주세요'}`}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
