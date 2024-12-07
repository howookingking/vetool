import { orderSchema } from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/order-schema'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CHECKLIST_ORDERS } from '@/constants/hospital/icu/chart/order'
import { useState } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

export default function ChecklistOrderField({
  form,
}: {
  form: UseFormReturn<z.infer<typeof orderSchema>>
}) {
  const orderName = form.getValues('icu_chart_order_name')
  const isDefaultCheckListOrder = CHECKLIST_ORDERS.some(
    (order) => order.orderName === orderName,
  )

  const [selectedOrderName, setSelectedOrderName] = useState(
    isDefaultCheckListOrder ? orderName : '',
  )
  const [inputOrderName, setInputOrderName] = useState(
    isDefaultCheckListOrder ? '' : orderName,
  )

  return (
    <>
      <FormField
        control={form.control}
        name="icu_chart_order_name"
        render={({ field }) => (
          <FormItem>
            <div className="grid grid-cols-2 space-x-2">
              <div className="space-y-2">
                <FormLabel>체크리스트</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value)
                    setSelectedOrderName(value)
                    setInputOrderName('')
                    const selectedOrder = CHECKLIST_ORDERS.find(
                      (order) => order.orderName === value,
                    )
                    form.setValue(
                      'icu_chart_order_comment',
                      selectedOrder?.orderComment ?? '',
                    )
                  }}
                  value={selectedOrderName}
                >
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
              </div>

              <div className="space-y-2">
                <Label>직접 입력</Label>
                <Input
                  value={inputOrderName}
                  onChange={(e) => {
                    const inputValue = e.target.value
                    setInputOrderName(inputValue)
                    setSelectedOrderName('')
                    form.setValue('icu_chart_order_name', inputValue.trim())
                    form.setValue('icu_chart_order_comment', '')
                  }}
                  placeholder="직접 입력"
                />
              </div>
            </div>
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
              체크리스트 오더 설명
            </FormLabel>
            <FormControl>
              <Input placeholder="오더에 대한 설명을 입력해주세요" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
