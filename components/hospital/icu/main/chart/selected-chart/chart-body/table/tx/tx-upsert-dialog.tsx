'use client'

import TxDetailInsertStep from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/tx/detail-insert-step/tx-detail-insert-step'
import TxSelectUserStep from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/tx/tx-select-user-step'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { useTxMutationStore } from '@/lib/store/icu/tx-mutation'
import { useCallback } from 'react'

export default function TxUpsertDialog({
  showTxUser,
}: {
  showTxUser: boolean
}) {
  const {
    txStep,
    setTxStep,
    setIsMutationCanceled,
    reset: txLocalStateReset,
  } = useTxMutationStore()

  const { reset: orderQueueReset } = useIcuOrderStore()

  const handleClose = useCallback(() => {
    setTxStep('closed')
    orderQueueReset()
    txLocalStateReset()
    setIsMutationCanceled(true)
  }, [setIsMutationCanceled, setTxStep, orderQueueReset, txLocalStateReset])

  return (
    <Dialog open={txStep !== 'closed'} onOpenChange={handleClose}>
      <DialogContent>
        {txStep === 'detailInsert' && (
          <TxDetailInsertStep showTxUser={showTxUser} />
        )}

        {txStep === 'selectUser' && (
          <TxSelectUserStep handleClose={handleClose} />
        )}
      </DialogContent>
    </Dialog>
  )
}
