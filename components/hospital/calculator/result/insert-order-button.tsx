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
import { Form } from '@/components/ui/form'
import { toast } from '@/components/ui/use-toast'
import { calcResultApplyFormSchema } from '@/lib/schemas/icu/chart/calc-result-apply-schema'
import { insertCalcResultOrder } from '@/lib/services/icu/chart/order-mutation'
import { cn } from '@/lib/utils/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { ListPlus, LoaderCircle } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import OrderFormField from '../../icu/main/chart/selected-chart/chart-body/table/order/order-form-field'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

type Props = {
  orderName: string
  setIsSheetOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

export default function InsertOrderButton({
  orderName,
  setIsSheetOpen,
}: Props) {
  const { hos_id, target_date, patient_id } = useParams()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (
    values: z.infer<typeof calcResultApplyFormSchema>,
  ) => {
    setIsSubmitting(true)

    await insertCalcResultOrder(
      hos_id as string,
      patient_id as string,
      target_date as string,
      values.icu_chart_order_type,
      values.icu_chart_order_name,
      values.icu_chart_order_comment ?? '',
    )

    toast({
      title: '오더 추가 완료',
      description: '최하단에 오더가 추가되었습니다',
    })
    setIsSubmitting(false)
    setIsDialogOpen(false)
    setIsSheetOpen!(false)
  }

  const form = useForm<z.infer<typeof calcResultApplyFormSchema>>({
    resolver: zodResolver(calcResultApplyFormSchema),
    defaultValues: {
      icu_chart_order_type: 'fluid',
      icu_chart_order_name: orderName,
      icu_chart_order_comment: '',
    },
  })

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <ListPlus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>계산 오더 추가</DialogTitle>
          <VisuallyHidden>
            <DialogDescription />
          </VisuallyHidden>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-4"
          >
            <OrderFormField form={form} />

            <DialogFooter className="ml-auto w-full gap-2 md:gap-0">
              <DialogClose asChild>
                <Button type="button" variant="outline" tabIndex={-1}>
                  닫기
                </Button>
              </DialogClose>

              <Button type="submit" disabled={isSubmitting}>
                확인
                <LoaderCircle
                  className={cn(isSubmitting ? 'animate-spin' : 'hidden')}
                />
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
