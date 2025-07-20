'use no memo'

import DeleteTodoDialog from '@/components/hospital/home/body/todo/delete-todo-dialog'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Dialog,
  DialogClose,
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
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { todoSchema } from '@/lib/schemas/hospital-home/hospital-home-schemas'
import { upsertTodo } from '@/lib/services/hospital-home/todo'
import { cn, formatDateToISOString } from '@/lib/utils/utils'
import type { ClientTodo } from '@/types/hospital/todo'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { CalendarIcon, Edit, LoaderCircle, Plus } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type Props = {
  hosId: string
  date: Date
  isEdit?: boolean
  refetch: () => Promise<void>
  todo?: ClientTodo
}

export default function UpsertTodoDialog({
  hosId,
  date,
  isEdit,
  refetch,
  todo,
}: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const form = useForm<z.infer<typeof todoSchema>>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      todo_title: todo?.todo_title ?? '',
      target_user: todo?.target_user ?? '',
      targaet_date: date,
    },
  })

  const handleUpsertTodo = async (values: z.infer<typeof todoSchema>) => {
    const { todo_title, target_user, targaet_date } = values
    setIsSubmitting(true)

    await upsertTodo(
      todo_title,
      target_user,
      formatDateToISOString(targaet_date),
      hosId,
      todo?.id,
    )

    toast({
      title: 'TODO를 추가하였습니다',
    })
    setIsDialogOpen(false)
    setIsSubmitting(false)

    await refetch()
  }

  const handleOpenChange = (open: boolean) => {
    if (open) {
      form.reset({
        todo_title: todo?.todo_title ?? '',
        target_user: todo?.target_user ?? '',
        targaet_date: date,
      })
    }
    setIsDialogOpen(open)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {isEdit ? (
          <Button size="icon" className="h-6 w-6" variant="ghost">
            <Edit
              style={{
                width: '14px',
                height: '14px',
              }}
            />
          </Button>
        ) : (
          <Button
            variant="default"
            size="icon"
            className="h-6 w-6 rounded-full"
          >
            <Plus size={14} />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[640px]">
        <DialogHeader>
          <DialogTitle>TODO {isEdit ? '수정' : '추가'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'TODO를 수정해주세요' : '새로운 TODO를 추가해주세요'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpsertTodo)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="targaet_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    날짜 <span className="text-destructive">*</span>
                  </FormLabel>
                  <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'yyyy-MM-dd')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        initialFocus
                        locale={ko}
                        fixedWeeks
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date)
                          setIsPopoverOpen(false)
                        }}
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="todo_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    TODO <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      {...field}
                      value={field.value ?? ''}
                      className="text-sm"
                      autoComplete="off"
                      placeholder="검체수거"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="target_user"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>담당자</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      className="h-8 text-sm"
                      autoComplete="off"
                      placeholder="간호팀"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <div className="flex justify-between">
              {isEdit && (
                <DeleteTodoDialog
                  todoId={todo!.id}
                  setIsDialogOpen={setIsDialogOpen}
                  refetch={refetch}
                />
              )}

              <div className="ml-auto">
                <DialogClose asChild>
                  <Button variant="outline" tabIndex={-1}>
                    취소
                  </Button>
                </DialogClose>
                <Button type="submit" className="ml-2" disabled={isSubmitting}>
                  등록
                  <LoaderCircle
                    className={cn(
                      isSubmitting ? 'ml-2 animate-spin' : 'hidden',
                    )}
                  />
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
