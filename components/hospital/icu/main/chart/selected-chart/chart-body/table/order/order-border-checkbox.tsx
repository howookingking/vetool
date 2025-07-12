import BgCheckbox from '@/components/common/styled-checkbox'
import { FormControl, FormField, FormItem } from '@/components/ui/form'
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
        <FormItem>
          <FormControl>
            <BgCheckbox
              title="테두리 표시"
              checked={field.value ?? false}
              onCheckedChange={(checked) => {
                field.onChange(checked)
              }}
            />
          </FormControl>
        </FormItem>
      )}
    />
  )
}
