'use client'

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
import { createTodo } from '@/lib/services/hospital-home/todo'
import { cn } from '@/lib/utils/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { todoSchema } from './todo-schema'

export default function CreateTodoDialog({
  hosId,
  type,
  date,
}: {
  hosId: string
  type: '어제' | '오늘' | '내일'
  date: string
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { refresh } = useRouter()

  const form = useForm<z.infer<typeof todoSchema>>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      todo_title: undefined,
      target_user: undefined,
    },
  })

  useEffect(() => {
    if (!isDialogOpen) {
      form.reset({
        todo_title: undefined,
        target_user: undefined,
      })
    }
  }, [isDialogOpen, form])

  const handleCreateTodo = async (values: z.infer<typeof todoSchema>) => {
    const { todo_title, target_user } = values
    setIsSubmitting(true)

    await createTodo(todo_title, target_user, date, hosId)

    toast({
      title: 'TODO를 추가하였습니다',
    })
    setIsDialogOpen(false)
    setIsSubmitting(false)
    refresh()
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="icon" className="h-6 w-6 rounded-full">
          <Plus size={14} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>{type} TODO 추가</DialogTitle>
          <DialogDescription>새로운 TODO를 추가해주세요</DialogDescription>
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

            <div className="ml-auto">
              <DialogClose asChild>
                <Button variant="outline" tabIndex={-1}>
                  취소
                </Button>
              </DialogClose>
              <Button type="submit" className="ml-2" disabled={isSubmitting}>
                등록
                <LoaderCircle
                  className={cn(isSubmitting ? 'ml-2 animate-spin' : 'hidden')}
                />
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
