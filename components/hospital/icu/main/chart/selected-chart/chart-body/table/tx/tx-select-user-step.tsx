'use no memo'

import SubmitButton from '@/components/common/submit-button'
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useSafeRefresh } from '@/hooks/use-safe-refresh'
import useUpsertTx from '@/hooks/use-upsert-tx'
import { userLogFormSchema } from '@/lib/schemas/icu/chart/tx-schema'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { useIcuTxStore } from '@/lib/store/icu/icu-tx'
import type { TxLog } from '@/types/icu/chart'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type Props = {
  hosId: string
  handleClose: () => void
  isSetting?: boolean
}

export default function TxSelectUserStep({
  hosId,
  handleClose,
  isSetting,
}: Props) {
  const safeRefrsh = useSafeRefresh()

  const { txLocalState } = useIcuTxStore()
  const { selectedTxPendingQueue } = useIcuOrderStore()
  const { isSubmitting, upsertTx, upsertMultipleTx } = useUpsertTx({
    hosId,
    onSuccess: () => handleClose(),
  })

  const form = useForm<z.infer<typeof userLogFormSchema>>({
    resolver: zodResolver(userLogFormSchema),
    defaultValues: {
      userLog: '',
    },
  })

  const handleUpsertTx = async (values: z.infer<typeof userLogFormSchema>) => {
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
        txImages: txLocalState?.txImages,
        bucketImagesLength: txLocalState?.bucketImagesLength,
      }).then(() => toast.success('다중 처치 결과를 입력했습니다'))

      safeRefrsh()
      return
    }

    // 단일 Tx 입력
    await upsertTx(txLocalState, updatedLogs)

    safeRefrsh()
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>처치자 선택</DialogTitle>
        <DialogDescription>
          처치자 코드 또는 이름을 입력해주세요
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
                    autoFocus
                    disabled={isSubmitting || isSetting}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <div className="ml-auto">
            <SubmitButton
              isPending={isSubmitting}
              buttonText="확인"
              disabled={isSetting}
            />
          </div>
        </form>
      </Form>
    </>
  )
}
