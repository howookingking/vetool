import TxLog from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/tx/detail-insert-step/tx-log'
import { txDetailRegisterFormSchema } from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/tx/tx-schema'
import { Button } from '@/components/ui/button'
import {
  DialogClose,
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
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { deleteIcuChartTx } from '@/lib/services/icu/chart/tx-mutation'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { useTxMutationStore } from '@/lib/store/icu/tx-mutation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function TxDetailInsertStep() {
  const {
    setTxStep,
    txLocalState,
    setTxLocalState,
    setIsDeleting,
    reset: txLocalStateReset,
  } = useTxMutationStore()
  const { selectedTxPendingQueue, reset: orderQueueReset } = useIcuOrderStore()

  const form = useForm<z.infer<typeof txDetailRegisterFormSchema>>({
    resolver: zodResolver(txDetailRegisterFormSchema),
    defaultValues: {
      result: txLocalState?.txResult ?? '',
      comment: txLocalState?.txComment ?? '',
      isNotificationChecked: false,
    },
  })

  const hasTxOrder = useMemo(() => {
    return selectedTxPendingQueue.some((order) => order.txId)
  }, [selectedTxPendingQueue])

  const handleNextStep = async (
    values: z.infer<typeof txDetailRegisterFormSchema>,
  ) => {
    setTxLocalState({
      txResult: values.result,
      txComment: values.comment,
      // isNotificationChecked: values.isNotificationChecked,
    })

    setTxStep('seletctUser')
  }

  const handleCloseClick = () => {
    setTxStep('closed')
    txLocalStateReset()
    orderQueueReset()
  }

  const handleDeleteTx = async () => {
    setIsDeleting(true)
    setTxStep('closed')

    if (hasTxOrder) {
      selectedTxPendingQueue.forEach(async (order) => {
        if (order.txId) await deleteIcuChartTx(order.txId)
      })
    } else {
      await deleteIcuChartTx(txLocalState?.txId!)
    }

    toast({
      title: '처치내역을 삭제하였습니다',
    })

    txLocalStateReset()
    orderQueueReset()
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>처치 상세 입력</DialogTitle>
        <DialogDescription />
      </DialogHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleNextStep)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="result"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="">처치 결과*</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="h-8 text-sm"
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="">코멘트</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="h-8 text-sm"
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          {/* <IcuChartTxImageInput
            txId={txLocalState?.txId}
            images={txImageState ?? []}
            onImagesChange={(newImages) => setTxImageState(newImages)}
          /> */}

          {txLocalState?.txLog?.length && <TxLog logs={txLocalState?.txLog} />}

          {/* <FormField
            control={form.control}
            name="isNotificationChecked"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="notification"
                    name="notification"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel htmlFor="notification">알림 보내기</FormLabel>
                </div>
              </FormItem>
            )}
          /> */}

          <div className="flex justify-between">
            {(txLocalState?.txId || hasTxOrder) && (
              <Button
                variant="destructive"
                onClick={handleDeleteTx}
                tabIndex={-1}
                type="button"
              >
                삭제
              </Button>
            )}
            <div className="ml-auto flex gap-2">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseClick}
                  tabIndex={-1}
                >
                  닫기
                </Button>
              </DialogClose>
              <Button type="submit">다음</Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  )
}
