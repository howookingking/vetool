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
import { orderSchema } from '@/lib/schemas/icu/chart/order-schema'
import { ChangeEvent, useState } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

export default function ChecklistOrderField({
  form,
}: {
  form: UseFormReturn<z.infer<typeof orderSchema>>
}) {
  const defaultValue = form.getValues('icu_chart_order_name')

  const [directInput, setDirectInput] = useState(defaultValue)
  const [selectValue, setSelectValue] = useState(defaultValue)

  const handleSelectChange = (value: string) => {
    setSelectValue(value)

    form.setValue('icu_chart_order_name', value)
    form.setValue('icu_chart_order_comment', '')

    setDirectInput('')
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.trim()
    setDirectInput(inputValue)
    setSelectValue('')
    form.setValue('icu_chart_order_name', inputValue)
  }

  return (
    <>
      <FormField
        control={form.control}
        name="icu_chart_order_name"
        render={() => (
          <FormItem>
            <div className="grid grid-cols-2 space-x-2">
              <div>
                <FormLabel>체크리스트</FormLabel>
                <Select onValueChange={handleSelectChange} value={selectValue}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="체크리스트 항목 선택" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CHECKLIST_ORDERS.map((order) => (
                      <SelectItem key={order} value={order}>
                        {order}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>직접 입력</Label>
                <Input
                  value={directInput}
                  onChange={handleInputChange}
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
