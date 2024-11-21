import { templateFormSchema } from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-center/weght-bookmark-schema'
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
import { insertCustomTemplateChart } from '@/lib/services/icu/template/template'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { useTemplateStore } from '@/lib/store/icu/template'
import { cn } from '@/lib/utils/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function AddTemplateOrdersButton({
  showButton,
}: {
  showButton?: boolean
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const { refresh } = useRouter()
  const { hos_id, target_date } = useParams()
  const { templateOrders, reset } = useTemplateStore()
  const { setSelectedOrderPendingQueue } = useIcuOrderStore()

  // 템플릿 페이지에서 만든 템플릿 오더
  const templateOrdersLength = templateOrders.length

  const form = useForm<z.infer<typeof templateFormSchema>>({
    resolver: zodResolver(templateFormSchema),
    defaultValues: {
      template_name: undefined,
      template_comment: undefined,
    },
  })

  const handleSubmit = async (values: z.infer<typeof templateFormSchema>) => {
    setIsSubmitting(true)

    await insertCustomTemplateChart(
      hos_id as string,
      target_date as string,
      templateOrders,
      values.template_name,
      values.template_comment,
    )

    toast({
      title: '템플릿이 추가되었습니다',
    })

    setIsSubmitting(false)
    setIsDialogOpen(false)
    reset()
    refresh()
  }

  useEffect(() => {
    if (!isDialogOpen) {
      form.reset({
        template_name: undefined,
        template_comment: undefined,
      })

      setSelectedOrderPendingQueue([])
    }
  }, [isDialogOpen, form, setSelectedOrderPendingQueue])

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        {showButton && <Button disabled={!templateOrdersLength}>저장</Button>}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>템플릿 저장</DialogTitle>
          <DialogDescription>{`${templateOrdersLength}개의 오더를 저장합니다`}</DialogDescription>
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
