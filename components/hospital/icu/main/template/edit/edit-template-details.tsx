import { templateFormSchema } from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-center/weght-bookmark-schema'
import { Button } from '@/components/ui/button'
import {
  Dialog,
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
import { updateTemplate } from '@/lib/services/icu/template/template'
import { useTemplateStore } from '@/lib/store/icu/template'
import { cn } from '@/lib/utils/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
export default function EditTemplateDetails({
  templateId,
  templateName,
  templateComment,
  isNextStep,
  setIsNextStep,
}: {
  templateId: string
  templateName: string
  templateComment: string | null
  isNextStep: boolean
  setIsNextStep: Dispatch<SetStateAction<boolean>>
}) {
  const { refresh } = useRouter()
  const { hos_id } = useParams()
  const { reset, setIsTemplateDialogOpen } = useTemplateStore()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof templateFormSchema>>({
    resolver: zodResolver(templateFormSchema),
    defaultValues: {
      template_name: templateName ?? undefined,
      template_comment: templateComment ?? undefined,
    },
  })

  const handleSubmit = async (values: z.infer<typeof templateFormSchema>) => {
    if (
      values.template_name === templateName &&
      values.template_comment === templateComment
    ) {
      setIsTemplateDialogOpen(false)

      toast({
        title: '템플릿을 수정하였습니다',
      })

      return
    }

    setIsSubmitting(true)

    await updateTemplate(
      hos_id as string,
      templateId,
      values.template_name,
      values.template_comment ?? '',
    )

    toast({
      title: '템플릿을 수정하였습니다',
    })

    setIsSubmitting(false)
    setIsTemplateDialogOpen(false)
    reset()
    refresh()
  }

  return (
    <Dialog open={isNextStep} onOpenChange={setIsTemplateDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{templateName} 템플릿 수정</DialogTitle>
          <DialogDescription>
            {templateName} 템플릿의 정보를 수정합니다
          </DialogDescription>
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
                  <FormLabel>템플릿 이름*</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value}
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

            <div className="flex">
              <div className="ml-auto">
                <Button
                  type="button"
                  variant="outline"
                  tabIndex={-1}
                  onClick={() => setIsNextStep(false)}
                >
                  이전
                </Button>
                <Button type="submit" disabled={isSubmitting} className="ml-2">
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
