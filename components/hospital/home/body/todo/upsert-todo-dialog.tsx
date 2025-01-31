'use no memo'

import DeleteTodoDialog from '@/components/hospital/home/body/todo/delete-todo-dialog'
import { Button } from '@/components/ui/button'
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
import { toast } from '@/components/ui/use-toast'
import { todoSchema } from '@/lib/schemas/icu/icu-schema'
import { upsertTodo } from '@/lib/services/hospital-home/todo'
import { cn, formatDate } from '@/lib/utils/utils'
import { type ClientTodo } from '@/types/hospital/todo'
import { zodResolver } from '@hookform/resolvers/zod'
import { Edit, LoaderCircle, Plus } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type UpsertTodoDialogProps = {
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
}: UpsertTodoDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof todoSchema>>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      todo_title: todo?.todo_title ?? '',
      target_user: todo?.target_user ?? '',
    },
  })

  const handleUpsertTodo = async (values: z.infer<typeof todoSchema>) => {
    const { todo_title, target_user } = values
    setIsSubmitting(true)

    await upsertTodo(todo_title, target_user, formatDate(date), hosId, todo?.id)

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
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>TODO 추가</DialogTitle>
          <DialogDescription>새로운 TODO를 추가해주세요</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpsertTodo)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="todo_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    TODO <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      className="h-8 text-sm"
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
