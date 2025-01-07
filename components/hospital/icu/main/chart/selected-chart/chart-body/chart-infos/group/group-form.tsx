import DialogFooterButtons from '@/components/common/dialog-footer-buttons'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { toast } from '@/components/ui/use-toast'
import { groupCheckFormSchema } from '@/lib/schemas/icu/chart/chart-info-schema'
import { updateGroup } from '@/lib/services/icu/chart/update-icu-chart-infos'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function GroupForm({
  isDialogOpen,
  currentGroups,
  icuIoId,
  setIsDialogOpen,
}: {
  isDialogOpen: boolean
  currentGroups: string[]
  icuIoId: string
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof groupCheckFormSchema>>({
    resolver: zodResolver(groupCheckFormSchema),
    defaultValues: {
      groupList: currentGroups,
    },
  })

  const {
    basicHosData: { groupListData },
  } = useBasicHosDataContext()

  useEffect(() => {
    if (!isDialogOpen) {
      form.reset({ groupList: currentGroups })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDialogOpen, currentGroups])

  const handleSubmit = async (values: z.infer<typeof groupCheckFormSchema>) => {
    setIsSubmitting(true)

    await updateGroup(icuIoId, values.groupList)

    toast({
      title: '그룹을 변경하였습니다',
    })

    setIsSubmitting(false)
    setIsDialogOpen(false)
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
        <DialogFooterButtons
          buttonName="변경"
          isLoading={isSubmitting}
          setIsDialogOpen={setIsDialogOpen}
        />
      </form>
    </Form>
  )
}
