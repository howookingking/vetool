'use no memo'

import DialogFooterButtons from '@/components/common/dialog-footer-buttons'
import { Badge } from '@/components/ui/badge'
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
import { GroupCheckFormSchema } from '@/lib/schemas/admin/admin-schema'
import { updateStaffGroup } from '@/lib/services/admin/staff'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type Props = {
  userId: string
  group: string[] | null
  groupList: string[]
  name: string
}

export function GroupColumnDialog({ groupList, userId, group, name }: Props) {
  const { refresh } = useRouter()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  const form = useForm<z.infer<typeof GroupCheckFormSchema>>({
    resolver: zodResolver(GroupCheckFormSchema),
    defaultValues: {
      items: group || [],
    },
  })

  const handleSubmit = async (values: z.infer<typeof GroupCheckFormSchema>) => {
    setIsUpdating(true)

    await updateStaffGroup(userId, values.items)

    toast({
      title: '그룹을 변경하였습니다',
    })
    refresh()
    setIsDialogOpen(false)
    setIsUpdating(false)
  }

  const handleOpenChange = (open: boolean) => {
    if (open) {
      form.reset({
        items: group || [],
      })
    }
    setIsDialogOpen(open)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger>
        {!group && <Badge variant="destructive">미분류</Badge>}

        <ul className="flex gap-1">
          {group?.map((item, index) => (
            <li key={`${item}-${index}`}>
              <Badge>{item}</Badge>
            </li>
          ))}
        </ul>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{name}님 그룹 수정</DialogTitle>
          <DialogDescription>하나 이상의 그룹을 설정해주세요</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col"
          >
            <FormField
              control={form.control}
              name="items"
              render={() => (
                <FormItem>
                  {groupList.map((item, index) => (
                    <FormField
                      key={`${item}-${index}`}
                      control={form.control}
                      name="items"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item}
                            className="flex items-center gap-2 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
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
                            <FormLabel>{item}</FormLabel>
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
              buttonName="수정"
              isLoading={isUpdating}
              setIsDialogOpen={setIsDialogOpen}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
