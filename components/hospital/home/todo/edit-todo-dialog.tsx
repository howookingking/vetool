'use client'

import WarningMessage from '@/components/common/warning-message'
import { todoSchema } from '@/components/hospital/home/todo/todo-schema'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import { createTodo, deleteTodo } from '@/lib/services/hospital-home/todo'
import { useTodoStore } from '@/lib/store/icu/todo'
import { cn } from '@/lib/utils/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function EditTodoDialog({
  hosId,
  type,
}: {
  hosId: string
  type: '어제' | '오늘' | '내일' | ''
}) {
  const { refresh } = useRouter()
  const { todo, isTodoDialogOpen, setIsTodoDialogOpen } = useTodoStore()

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof todoSchema>>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      todo_title: todo.todo_title,
      target_user: todo.target_user ?? undefined,
    },
  })

  useEffect(() => {
    if (!isTodoDialogOpen) {
      form.reset({
        todo_title: undefined,
        target_user: undefined,
      })
    }
  }, [isTodoDialogOpen, form])

  const handleCreateTodo = async (values: z.infer<typeof todoSchema>) => {
    const { todo_title, target_user } = values
    setIsSubmitting(true)

    await createTodo(todo_title, target_user, todo.target_date, hosId, todo.id)

    toast({
      title: 'TODO를 수정하였습니다',
    })

    setIsTodoDialogOpen(false)
    setIsSubmitting(false)
    refresh()
  }

  const handleDeleteTodoClick = async () => {
    await deleteTodo(todo.id)

    toast({
      title: `${todo.todo_title} TODO를 삭제하였습니다`,
    })

    setIsDeleteDialogOpen(false)
    setIsTodoDialogOpen(false)
    refresh()
  }

  return (
    <Dialog open={isTodoDialogOpen} onOpenChange={setIsTodoDialogOpen}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>{type} TODO 수정</DialogTitle>
          <DialogDescription>
            {todo.todo_title} TODO를 수정합니다
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreateTodo)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="todo_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>TODO*</FormLabel>
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

            <div className="flex">
              <AlertDialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
              >
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    type="button"
                    className="mr-auto"
                    tabIndex={-1}
                  >
                    삭제
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      {todo.todo_title} TODO 삭제
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      선택한 TODO를 삭제합니다
                      <WarningMessage text="해당작업은 실행 후 되될릴 수 없습니다." />
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel tabIndex={-1}>취소</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-destructive hover:bg-destructive/80"
                      onClick={handleDeleteTodoClick}
                    >
                      삭제
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <div className="ml-auto">
                <DialogClose asChild>
                  <Button variant="outline" tabIndex={-1}>
                    취소
                  </Button>
                </DialogClose>
                <Button type="submit" className="ml-2" disabled={isSubmitting}>
                  수정
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
