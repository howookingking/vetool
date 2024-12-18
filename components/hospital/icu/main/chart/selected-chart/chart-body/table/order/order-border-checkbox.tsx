import { orderSchema } from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/order-schema'
import { Checkbox } from '@/components/ui/checkbox'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

export default function OrderBorderCheckbox({
  form,
}: {
  form: UseFormReturn<z.infer<typeof orderSchema>>
}) {
  return (
    <FormField
      control={form.control}
      name="is_bordered"
      render={({ field }) => (
        <FormItem className="flex items-center justify-end space-x-3 space-y-0 rounded-md">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className="space-y-1 leading-3">
            <FormLabel>테두리 표시</FormLabel>
          </div>
        </FormItem>
      )}
    />
  )
}
