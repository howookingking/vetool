import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  DEFAULT_ICU_ORDER_TYPE,
  OrderType,
} from '@/constants/hospital/icu/chart/order'
import { orderSchema } from '@/lib/schemas/icu/chart/order-schema'
import { cn } from '@/lib/utils/utils'
import { useState } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

export default function OrderFormField({
  form,
}: {
  form: UseFormReturn<z.infer<typeof orderSchema>>
}) {
  const orderType = form.watch('icu_chart_order_type')
  const [currentOrderType, setCurrentOrderType] = useState(orderType)

  return (
    <>
      {currentOrderType !== 'checklist' && (
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
                  onValueChange={(value) => {
                    setCurrentOrderType(value)
                    field.onChange(value)
                  }}
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
              {OrderTypeLabel(currentOrderType as OrderType).orderName}{' '}
              <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <Input
                disabled={orderType === 'checklist'}
                placeholder="오더를 입력해주세요"
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
              {OrderTypeLabel(currentOrderType as OrderType).orderComment}
            </FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}

export function OrderTypeLabel(orderType: OrderType) {
  switch (orderType) {
    case 'checklist':
      return { orderName: '체크리스트오더', orderComment: '오더설명' }
    case 'feed':
      return { orderName: '식이오더', orderComment: '오더설명' }
    case 'fluid':
      return { orderName: '수액오더', orderComment: '수액속도' }
    case 'po':
      return { orderName: '경구오더', orderComment: '오더설명' }
    case 'test':
      return { orderName: '검사오더', orderComment: '오더설명' }
    case 'manual':
      return { orderName: '기타오더', orderComment: '오더설명' }
    case 'injection':
      return { orderName: '주사오더', orderComment: '주사량' }
    default:
      return { orderName: '기타오더', orderComment: '오더설명' }
  }
}
