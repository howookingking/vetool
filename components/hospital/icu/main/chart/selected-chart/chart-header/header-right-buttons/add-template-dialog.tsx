'use no memo'

import StyledCheckbox from '@/components/common/styled-checkbox'
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
import { templateFormSchema } from '@/lib/schemas/icu/chart/template-schema'
import { createTemplateChart } from '@/lib/services/icu/template/template'
import { cn } from '@/lib/utils/utils'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { zodResolver } from '@hookform/resolvers/zod'
import { BookmarkPlus, LoaderCircle } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type Props = {
  orders: SelectedIcuOrder[]
  patientName: string
}

const DEFAULT_FORM_VALUES = {
  template_name: undefined,
  template_comment: undefined,
  is_time_included: false,
} as const

export default function AddTemplateDialog({ orders, patientName }: Props) {
  const { hos_id } = useParams()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const form = useForm<z.infer<typeof templateFormSchema>>({
    resolver: zodResolver(templateFormSchema),
    defaultValues: DEFAULT_FORM_VALUES,
  })

  const handleSubmit = async (values: z.infer<typeof templateFormSchema>) => {
    const { is_time_included, template_comment, template_name } = values

    setIsSubmitting(true)

    const ordererDefaulted = orders.map((order) => ({
      ...order,
      order_times: order.order_times!.map((time) =>
        time !== '0' ? '기본' : '0',
      ),
    }))

    await createTemplateChart(
      hos_id as string,
      ordererDefaulted,
      template_name,
      is_time_included,
      template_comment,
    )

    toast({
      title: '템플릿이 추가되었습니다',
    })

    setIsSubmitting(false)
    setIsDialogOpen(false)
  }

  const handleOpenChange = (open: boolean) => {
    if (open) form.reset(DEFAULT_FORM_VALUES)
    setIsDialogOpen(open)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <BookmarkPlus size={18} />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{patientName} 차트를 템플릿으로 저장</DialogTitle>
          <DialogDescription>{`
               ${orders.length}개의 오더를 저장합니다`}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="template_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    템플릿 이름 <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ''}
                      placeholder="템플릿 이름을 입력해주세요"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="template_comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>설명</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ''}
                      placeholder="설명을 입력해주세요"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="is_time_included"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <StyledCheckbox
                      title={
                        <>
                          <span className="bg-rose-400/10 p-1">시간정보</span>를
                          같이 저장합니다
                        </>
                      }
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex">
              <div className="ml-auto">
                <DialogClose asChild>
                  <Button type="button" variant="outline" tabIndex={-1}>
                    닫기
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={isSubmitting} className="ml-2">
                  저장
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
