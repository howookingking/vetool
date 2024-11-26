'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { useTxMutationStore } from '@/lib/store/icu/tx-mutation'
import { useCallback } from 'react'
import TxDetailInsertStep from './detail-insert-step/tx-detail-insert-step'
import TxSelectUserStep from './tx-select-user-step'

export default function TxUpsertDialog() {
  const { txStep, setTxStep, setIsMutationCanceled } = useTxMutationStore()

  const { reset: orderQueueReset } = useIcuOrderStore()

  const handleClose = useCallback(() => {
    setTxStep('closed')
    orderQueueReset()
    setIsMutationCanceled(true)
  }, [setIsMutationCanceled, setTxStep])

  return (
    <Dialog open={txStep !== 'closed'} onOpenChange={handleClose}>
      <DialogContent>
        {txStep === 'detailInsert' && <TxDetailInsertStep />}

        {txStep === 'seletctUser' && (
          <TxSelectUserStep handleClose={handleClose} />
        )}
      </DialogContent>
    </Dialog>
  )
}
