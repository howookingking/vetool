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
import useUpsertTx from '@/hooks/use-upsert-tx'
import { userLogFormSchema } from '@/lib/schemas/icu/chart/tx-schema'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { useTxMutationStore } from '@/lib/store/icu/tx-mutation'
import { cn } from '@/lib/utils/utils'
import type { TxLog } from '@/types/icu/chart'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogDescription } from '@radix-ui/react-dialog'
import { format } from 'date-fns'
import { LoaderCircle } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useCallback, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function TxSelectUserStep({
  handleClose,
}: {
  handleClose: () => void
}) {
  const { txLocalState } = useTxMutationStore()
  const { selectedTxPendingQueue } = useIcuOrderStore()
  const { hos_id } = useParams()
  const { isSubmitting, upsertTx, upsertMultipleTx } = useUpsertTx({
    hosId: hos_id as string,
    onSuccess: () => handleClose(),
  })

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

  const handleUpsertTx = useCallback(
    async (values: z.infer<typeof userLogFormSchema>) => {
      let updatedLogs = txLocalState?.txLog ?? []

      if (txLocalState?.txResult && txLocalState.txResult.trim() !== '') {
        const newLog: TxLog = {
          result: txLocalState.txResult,
          name: values.userLog,
          createdAt: format(new Date(), 'yyyy-MM-dd HH:mm'),
        }

        if (newLog.result && newLog.result.includes('$')) {
          newLog.result = newLog.result.split('$')[0].trim()
        }

        updatedLogs = [...updatedLogs, newLog]
      }

      // 다중 Tx 입력
      if (selectedTxPendingQueue.length) {
        await upsertMultipleTx(selectedTxPendingQueue, {
          result: txLocalState?.txResult,
          comment: txLocalState?.txComment,
          isCrucialChecked: txLocalState?.isCrucialChecked,
          orderName: txLocalState?.icuChartOrderName,
          orderType: txLocalState?.icuChartOrderType,
          updatedLogs,
        })

        return
      }

      // 단일 Tx 입력
      await upsertTx(txLocalState, updatedLogs)
    },
    [txLocalState, selectedTxPendingQueue, upsertTx, upsertMultipleTx],
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
              onClick={handleClose}
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
