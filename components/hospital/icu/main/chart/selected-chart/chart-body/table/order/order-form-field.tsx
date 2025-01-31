import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { orderSchema } from '@/lib/schemas/icu/chart/order-schema'
import { type UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

export default function OrderFormField({
  form,
}: {
  form: UseFormReturn<z.infer<typeof orderSchema>>
}) {
  const orderType = form.watch('icu_chart_order_type')

  return (
    <>
      <FormField
        control={form.control}
        name="icu_chart_order_name"
        render={({ field }) => (
          <FormItem className="w-full space-y-2">
            <FormLabel className="font-semibold">
              오더명 <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <Input
                disabled={orderType === 'checklist'}
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
            <FormLabel className="font-semibold">오더 설명</FormLabel>
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
