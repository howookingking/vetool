'use no memo'

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
import {
  createTemplateChart,
  updateTemplateChart,
} from '@/lib/services/icu/template/template'
import { type SelectedIcuOrder } from '@/types/icu/chart'
import { type TemplateChart } from '@/types/icu/template'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type ConfirmAddTemplateDialogProps = {
  sortedOrders: SelectedIcuOrder[]
  setUseUpsertTemplateDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
  isEdit: boolean
  selectedTemplateChart: TemplateChart | null
}

export default function ConfirmAddTemplateDialog({
  sortedOrders,
  setUseUpsertTemplateDialogOpen,
  isEdit,
  selectedTemplateChart,
}: ConfirmAddTemplateDialogProps) {
  const { refresh } = useRouter()
  const { hos_id } = useParams()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const form = useForm<z.infer<typeof templateFormSchema>>({
    resolver: zodResolver(templateFormSchema),
    defaultValues: {
      template_name: undefined,
      template_comment: undefined,
    },
  })

  const handleSubmit = async (values: z.infer<typeof templateFormSchema>) => {
    setIsSubmitting(true)

    isEdit
      ? await updateTemplateChart(
          selectedTemplateChart?.icu_chart_id!,
          sortedOrders,
          selectedTemplateChart?.template_id!,
          values.template_name,
          values.template_comment ?? '',
          hos_id as string,
        )
      : await createTemplateChart(
          hos_id as string,
          sortedOrders,
          values.template_name,
          values.template_comment,
        )

    toast({
      title: isEdit ? '템플릿이 수정되었습니다' : '템플릿이 추가되었습니다',
    })

    setIsSubmitting(false)
    setIsDialogOpen(false)
    setUseUpsertTemplateDialogOpen(false)
    refresh()
  }

  const handleOpenChange = (open: boolean) => {
    if (open) {
      form.reset({
        template_name: selectedTemplateChart?.template_name ?? '',
        template_comment: selectedTemplateChart?.template_comment ?? '',
      })
    }
    setIsDialogOpen(open)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button disabled={sortedOrders.length === 0}>다음</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>템플릿 {isEdit ? '수정' : '저장'}</DialogTitle>
          <DialogDescription>{`${sortedOrders.length}개의 오더를 저장합니다`}</DialogDescription>
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
                  <FormMessage className="mt-2" />
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
                  <FormMessage className="mt-2" />
                </FormItem>
              )}
            />

            <div className="flex">
              <div className="ml-auto">
                <DialogClose asChild>
                  <Button type="button" variant="outline" tabIndex={-1}>
                    취소
                  </Button>
                </DialogClose>

                <Button type="submit" disabled={isSubmitting} className="ml-2">
                  저장
                  {isSubmitting && <LoaderCircle className="animate-spin" />}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
