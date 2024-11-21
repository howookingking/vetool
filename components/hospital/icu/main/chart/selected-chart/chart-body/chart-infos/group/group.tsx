'use client'

import DialogFooterButtons from '@/components/common/dialog-footer-buttons'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { toast } from '@/components/ui/use-toast'
import { updateGroup } from '@/lib/services/icu/chart/update-icu-chart-infos'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import { zodResolver } from '@hookform/resolvers/zod'
import { Component } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import GroupBadge from './group-badge'
import { groupCheckFormSchema } from './group-schema'

export default function Group({
  currentGroups,
  icuIoId,
}: {
  currentGroups: string[]
  icuIoId: string
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
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
  }, [isDialogOpen, form, currentGroups])

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
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex w-full justify-start overflow-hidden px-2"
        >
          <Component size={16} className="text-muted-foreground" />

          <GroupBadge currentGroups={currentGroups} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>그룹 수정</DialogTitle>
          <DialogDescription />
        </DialogHeader>
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
      </DialogContent>
    </Dialog>
  )
}
