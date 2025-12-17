'use no memo'

import CommonDialogFooter from '@/components/common/common-dialog-footer'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useSafeRefresh } from '@/hooks/use-safe-refresh'
import { groupCheckFormSchema } from '@/lib/schemas/icu/chart/chart-info-schema'
import { updateGroup } from '@/lib/services/icu/chart/update-icu-chart-infos'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import { type Dispatch, type SetStateAction, useState } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type Props = {
  icuIoId: string
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
  form: UseFormReturn<z.infer<typeof groupCheckFormSchema>>
}

export default function GroupForm({ icuIoId, setIsDialogOpen, form }: Props) {
  const safeRefresh = useSafeRefresh()
  const {
    basicHosData: { groupListData },
  } = useBasicHosDataContext()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (values: z.infer<typeof groupCheckFormSchema>) => {
    setIsSubmitting(true)

    await updateGroup(icuIoId, values.groupList)

    toast.success('그룹을 변경하였습니다')

    setIsSubmitting(false)
    setIsDialogOpen(false)

    safeRefresh()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col"
      >
        <FormField
          control={form.control}
          name="groupList"
          render={() => (
            <FormItem>
              {groupListData.map((item) => (
                <FormField
                  key={item}
                  control={form.control}
                  name="groupList"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item}
                        className="flex flex-row items-center gap-2 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            name={item}
                            id={item}
                            checked={field.value?.includes(item)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item,
                                    ),
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel
                          className="cursor-pointer text-sm"
                          htmlFor={item}
                        >
                          {item}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />

        <CommonDialogFooter
          buttonName="수정"
          isPending={isSubmitting}
          type="submit"
        />
      </form>
    </Form>
  )
}
