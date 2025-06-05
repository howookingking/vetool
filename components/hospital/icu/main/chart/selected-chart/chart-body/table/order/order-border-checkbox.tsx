import { Checkbox } from '@/components/ui/checkbox'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { orderSchema } from '@/lib/schemas/icu/chart/order-schema'
import type { UseFormReturn } from 'react-hook-form'
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
        <FormItem className="flex space-x-2 space-y-0 rounded-md border p-4 shadow">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <FormLabel className="cursor-pointer">테두리 표시</FormLabel>
        </FormItem>
      )}
    />
  )
}
