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
import { templateFormSchema } from '@/lib/schemas/icu/chart/template-schema'
import {
  createTemplateChart,
  updateTemplateChart,
} from '@/lib/services/icu/template/template'
import {
  type DtOrderTimePendingQueue,
  useDtOrderStore,
} from '@/lib/store/icu/dt-order'
import type { IcuTemplate } from '@/types'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type ConfirmAddTemplateDialogProps = {
  sortedOrders: SelectedIcuOrder[]
  setIsUpsertTemplateDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
  isEdit: boolean
  selectedTemplateChart: IcuTemplate | null
}

export default function ConfirmAddTemplateDialog({
  sortedOrders,
  setIsUpsertTemplateDialogOpen,
  isEdit,
  selectedTemplateChart,
}: ConfirmAddTemplateDialogProps) {
  const { refresh } = useRouter()
  const { hos_id } = useParams()

  const { orderTimePendingQueue } = useDtOrderStore()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const form = useForm<z.infer<typeof templateFormSchema>>({
    resolver: zodResolver(templateFormSchema),
    defaultValues: {
      template_name: '',
      template_comment: '',
    },
  })

  const handleSubmit = async (values: z.infer<typeof templateFormSchema>) => {
    const { template_name, template_comment } = values

    setIsSubmitting(true)

    const updatedTemplateOrders =
      applyAndToggleTimePendingQueueToTemplateOrders(
        sortedOrders,
        orderTimePendingQueue,
      )

    if (isEdit) {
      await updateTemplateChart(
        hos_id as string,
        selectedTemplateChart?.icu_chart_id!,
        updatedTemplateOrders,
        selectedTemplateChart?.template_id!,
        template_name,
        template_comment ?? '',
      )
    } else {
      await createTemplateChart(
        hos_id as string,
        updatedTemplateOrders,
        template_name,
        true,
        template_comment,
      )
    }

    toast.success(
      isEdit ? '템플릿이 수정되었습니다' : '템플릿이 추가되었습니다',
    )

    setIsSubmitting(false)
    setIsDialogOpen(false)
    setIsUpsertTemplateDialogOpen(false)
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
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit(handleSubmit)(e)
            }}
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
                    닫기
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

function applyAndToggleTimePendingQueueToTemplateOrders(
  sortedOrders: SelectedIcuOrder[],
  orderTimePendingQueue: DtOrderTimePendingQueue[],
): SelectedIcuOrder[] {
  // 1. orderId별 시간 배열을 map으로 정리
  const queueMap = new Map<string, number[]>()

  for (const { orderId, orderTime } of orderTimePendingQueue) {
    const times = queueMap.get(orderId) ?? []
    times.push(orderTime)
    queueMap.set(orderId, times)
  }

  // 2. 각 order에 대해 order_times 토글 적용
  return sortedOrders.map((order) => {
    const toggleTimes = queueMap.get(order.order_id)

    // 해당 order에 적용할 시간 정보 없으면 그대로 반환
    if (!toggleTimes) return order

    // 기존 order_times 복사해서 수정
    const updatedTimes = order.order_times.map((time, index) => {
      const hour = index
      if (!toggleTimes.includes(hour)) return time

      // 값이 "기본"이면 "0"으로, "0"이면 "기본"으로
      if (time === '기본') return '0'
      if (time === '0') return '기본'
      return time // 그 외 값(사실 없으...)은 그대로 유지
    })

    return {
      ...order,
      order_times: updatedTimes,
    }
  })
}
