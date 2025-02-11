'use client'

import TxDetailInsertStep from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/tx/detail-insert-step/tx-detail-insert-step'
import TxSelectUserStep from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/tx/tx-select-user-step'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { useIcuTxStore } from '@/lib/store/icu/icu-tx'

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
  } = useIcuTxStore()
  const { reset: orderQueueReset } = useIcuOrderStore()

  const handleClose = () => {
    setTxStep('closed')
    orderQueueReset()
    txLocalStateReset()
    setIsMutationCanceled(true)
  }

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
