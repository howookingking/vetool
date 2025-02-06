import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { DEFAULT_ICU_ORDER_TYPE } from '@/constants/hospital/icu/chart/order'
import { orderSchema } from '@/lib/schemas/icu/chart/order-schema'
import { cn } from '@/lib/utils/utils'
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
      {orderType !== 'checklist' && (
        <FormField
          control={form.control}
          name="icu_chart_order_type"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="font-semibold">
                오더 타입 <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-wrap gap-4"
                >
                  {DEFAULT_ICU_ORDER_TYPE.filter(
                    (type) => type.value !== 'checklist',
                  ).map((item) => (
                    <FormItem
                      key={item.value}
                      className="flex cursor-pointer items-center space-x-1 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={item.value} />
                      </FormControl>
                      <FormLabel className={cn('cursor-pointer font-normal')}>
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
      )}

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
