import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CHECKLIST_ORDERS } from '@/constants/hospital/icu/chart/order'
import type { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { orderSchema } from '../order-schema'

export default function ChecklistOrderField({
  form,
}: {
  form: UseFormReturn<z.infer<typeof orderSchema>>
}) {
  return (
    <>
      <FormField
        control={form.control}
        name="icu_chart_order_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>체크리스트</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="체크리스트 항목 선택" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {CHECKLIST_ORDERS.map((order) => (
                  <SelectItem key={order.orderName} value={order.orderName}>
                    {order.orderName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

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
