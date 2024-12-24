import { toast } from '@/components/ui/use-toast'
import { upsertIcuTx } from '@/lib/services/icu/chart/tx-mutation'
import { OrderTimePendingQueue } from '@/lib/store/icu/icu-order'
import type { TxLocalState } from '@/lib/store/icu/tx-mutation'
import type { TxLog } from '@/types/icu/chart'
import { format } from 'date-fns'
import { useState } from 'react'

type TxUpdateOptions = {
  hosId: string
  onSuccess?: () => void
}

export default function useUpsertTx({ hosId, onSuccess }: TxUpdateOptions) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const upsertTx = async (txLocalState: TxLocalState, logs: TxLog[] = []) => {
    if (isSubmitting) return

    setIsSubmitting(true)
    const txState = { ...txLocalState }

    // 단일 간편 코멘트($) 입력한 경우
    if (txState.txResult?.includes('$')) {
      const [result, comment] = txState.txResult.split('$')
      txState.txResult = result.trim()
      txState.txComment = comment.trim()
    }

    await upsertIcuTx(hosId, txState, format(new Date(), 'yyyy-MM-dd'), logs)

    toast({
      title: '처치 내역이 업데이트 되었습니다',
    })

    onSuccess?.()
    setIsSubmitting(false)
  }

  // 다중 Tx 입력
  const upsertMultipleTx = async (
    txPendingQueue: OrderTimePendingQueue[],
    values: {
      result?: string | null
      comment?: string | null
      isCrucialChecked?: boolean
      orderName?: string
      orderType?: string
      updatedLogs: TxLog[]
    },
  ) => {
    if (isSubmitting) return
    setIsSubmitting(true)

    const txStates = txPendingQueue.map((item) => ({
      state: {
        txId: item.txId,
        txResult: values.result,
        txComment: values.comment,
        time: item.orderTime,
        icuChartOrderId: item.orderId,
        isCrucialChecked: values.isCrucialChecked,
        icuChartOrderName: values.orderName,
        icuChartOrderType: values.orderType,
      },
      logs:
        values.result && values.result.trim() !== ''
          ? [...(item.txLog ?? []), ...values.updatedLogs]
          : (item.txLog ?? []),
    }))

    await Promise.all(txStates.map(({ state, logs }) => upsertTx(state, logs)))
    onSuccess?.()
    setIsSubmitting(false)
  }

  return {
    isSubmitting,
    upsertTx,
    upsertMultipleTx,
  }
}
