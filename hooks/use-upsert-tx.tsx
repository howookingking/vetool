import { useState, useCallback } from 'react'
import { toast } from '@/components/ui/use-toast'
import { upsertIcuTx } from '@/lib/services/icu/chart/tx-mutation'
import { format } from 'date-fns'
import type { TxLocalState } from '@/lib/store/icu/tx-mutation'
import type { TxLog } from '@/types/icu/chart'

type TxUpdateOptions = {
  hosId: string
  onSuccess?: () => void
}

export function useUpsertTx({ hosId, onSuccess }: TxUpdateOptions) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const upsertTx = useCallback(
    async (txLocalState: TxLocalState, logs: TxLog[] = []) => {
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
    },
    [hosId, onSuccess, isSubmitting],
  )

  // 다중 Tx 입력
  const upsertMultipleTx = useCallback(
    async (txStates: Array<{ state: TxLocalState; logs: TxLog[] }>) => {
      if (isSubmitting) return

      setIsSubmitting(true)

      await Promise.all(
        txStates.map(({ state, logs }) => upsertTx(state, logs)),
      )
      onSuccess?.()
      setIsSubmitting(false)
    },
    [upsertTx, onSuccess, isSubmitting],
  )

  return {
    isSubmitting,
    upsertTx,
    upsertMultipleTx,
  }
}
