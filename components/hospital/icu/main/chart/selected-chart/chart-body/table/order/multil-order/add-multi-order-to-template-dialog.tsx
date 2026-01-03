'use no memo'

import StyledCheckbox from '@/components/common/styled-checkbox'
import SubmitButton from '@/components/common/submit-button'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { templateFormSchema } from '@/lib/schemas/icu/chart/template-schema'
import { createTemplateChart } from '@/lib/services/icu/template/template'
import { cn, HAS_ORDER } from '@/lib/utils/utils'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { zodResolver } from '@hookform/resolvers/zod'
import { BookmarkPlusIcon } from 'lucide-react'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const DEFAULT_FORM_VALUES = {
  template_name: undefined,
  template_comment: undefined,
  is_time_included: false,
} as const

type Props = {
  hosId: string
  setIsMultiOrderDialogOpen: Dispatch<SetStateAction<boolean>>
  multiOrderPendingQueue: Partial<SelectedIcuOrder>[]
  setMultiOrderPendingQueue: Dispatch<
    SetStateAction<Partial<SelectedIcuOrder>[]>
  >
}

export default function AddMultiOrderToTemplateDialog({
  hosId,
  setIsMultiOrderDialogOpen,
  multiOrderPendingQueue,
  setMultiOrderPendingQueue,
}: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const form = useForm<z.infer<typeof templateFormSchema>>({
    resolver: zodResolver(templateFormSchema),
    defaultValues: DEFAULT_FORM_VALUES,
  })

  const handleSubmit = async (values: z.infer<typeof templateFormSchema>) => {
    const { is_time_included, template_comment, template_name } = values

    setIsSubmitting(true)

    const ordererDefaultedMultiOrder = multiOrderPendingQueue.map((order) => ({
      ...order,
      icu_chart_order_time: order.icu_chart_order_time!.map((time) =>
        time !== '0' ? '기본' : '0',
      ),
    }))

    await createTemplateChart(
      hosId,
      ordererDefaultedMultiOrder,
      template_name,
      is_time_included,
      template_comment ?? '',
    )

    toast.success('템플릿을 추가하였습니다')

    setIsSubmitting(false)
    setIsDialogOpen(false)
    setIsMultiOrderDialogOpen(false)
    setMultiOrderPendingQueue([])
  }

  const handleOpenChange = (open: boolean) => {
    if (open) form.reset(DEFAULT_FORM_VALUES)
    setIsDialogOpen(open)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          className="flex items-center justify-start gap-2 py-5 text-base"
          variant="outline"
        >
          <BookmarkPlusIcon />
          템플릿으로 저장
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>템플릿 저장</DialogTitle>
          <DialogDescription>{`${multiOrderPendingQueue.length}개의 오더를 저장합니다`}</DialogDescription>
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
                          <span className={cn('p-1', HAS_ORDER)}>형광펜</span>을
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

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline" tabIndex={-1}>
                  닫기
                </Button>
              </DialogClose>

              <SubmitButton buttonText="저장" isPending={isSubmitting} />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
