import { userLogFormSchema } from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/tx/tx-schema'
import { Button } from '@/components/ui/button'
import { DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { upsertIcuTx } from '@/lib/services/icu/chart/tx-mutation'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { useRealtimeSubscriptionStore } from '@/lib/store/icu/realtime-subscription'
import { useTxMutationStore } from '@/lib/store/icu/tx-mutation'
import { cn } from '@/lib/utils/utils'
import type { TxLog } from '@/types/icu/chart'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogDescription } from '@radix-ui/react-dialog'
import { format } from 'date-fns'
import { LoaderCircle } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function TxSelectUserStep() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    txLocalState,
    setTxStep,
    reset: txLocalStateReset,
  } = useTxMutationStore()
  const { selectedTxPendingQueue, reset: orderQueueReset } = useIcuOrderStore()
  const { isSubscriptionReady } = useRealtimeSubscriptionStore()
  const { refresh } = useRouter()
  const { hos_id } = useParams()

  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const form = useForm<z.infer<typeof userLogFormSchema>>({
    resolver: zodResolver(userLogFormSchema),
    defaultValues: {
      userLog: '',
    },
  })

  const handleReset = useCallback(() => {
    setTxStep('closed')
    txLocalStateReset()
    orderQueueReset()
  }, [setTxStep, txLocalStateReset, orderQueueReset])

  const handleUpsertTx = useCallback(
    async (values: z.infer<typeof userLogFormSchema>) => {
      setIsSubmitting(true)

      const newLog: TxLog = {
        result: txLocalState?.txResult ?? '',
        name: values.userLog,
        createdAt: format(new Date(), 'yyyy-MM-dd HH:mm'),
      }

      if (newLog.result && newLog.result.includes('$')) {
        newLog.result = newLog.result.split('$')[0].trim()
      }

      const updatedLogs = [...(txLocalState?.txLog ?? []), newLog]

      // 다중 Tx 입력
      if (selectedTxPendingQueue.length) {
        await Promise.all(
          selectedTxPendingQueue.map((item) => {
            const updatedLogs = [...(item.txLog ?? []), newLog]

            return upsertIcuTx(
              hos_id as string,
              {
                txId: item.txId,
                txResult: txLocalState?.txResult,
                txComment: txLocalState?.txComment,
                time: item.orderTime,
                icuChartOrderId: item.orderId,
              },
              updatedLogs,
            )
          }),
        )
        handleReset()
        toast({ title: '처치 내역이 업데이트 되었습니다' })

        if (!isSubscriptionReady) refresh()
        return
      }

      // 단일 간편 코멘트($) 입력한 경우
      if (txLocalState?.txResult?.includes('$')) {
        const [result, comment] = txLocalState.txResult.split('$')

        await upsertIcuTx(
          hos_id as string,
          {
            ...txLocalState,
            txResult: result.trim(),
            txComment: comment.trim(),
          },
          updatedLogs,
        )

        handleReset()
        toast({ title: '처치 내역이 업데이트 되었습니다' })

        if (!isSubscriptionReady) refresh()

        return
      }

      // 단일 Tx 일반적인 경우
      await upsertIcuTx(hos_id as string, txLocalState, updatedLogs)
      handleReset()
      toast({
        title: '처치 내역이 업데이트 되었습니다',
      })

      if (!isSubscriptionReady) refresh()
    },
    [
      hos_id,
      txLocalState,
      selectedTxPendingQueue,
      handleReset,
      isSubscriptionReady,
      refresh,
    ],
  )

  return (
    <>
      <DialogHeader>
        <DialogTitle>처치자 선택</DialogTitle>
        <DialogDescription>
          처치자의 코드 또는 이름을 입력해주세요
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleUpsertTx)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="userLog"
            render={({ field }) => (
              <FormItem className="relative">
                <FormControl>
                  <Input
                    {...field}
                    className="h-8 text-sm"
                    autoComplete="off"
                    ref={inputRef}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <div className="col-span-2 ml-auto font-semibold">
            <Button
              type="button"
              variant="outline"
              tabIndex={-1}
              onClick={handleReset}
            >
              취소
            </Button>

            <Button type="submit" className="ml-2" disabled={isSubmitting}>
              확인
              <LoaderCircle
                className={cn(isSubmitting ? 'ml-2 animate-spin' : 'hidden')}
              />
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}
