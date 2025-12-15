import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import AddMultiOrderToTemplateDialog from './add-multi-order-to-template-dialog'
import BorderMultiOrderButton from './border-multi-order-button'
import CopyMultiOrderButton from './copy-multi-order-button'
import DeleteSelectedOrdersDialog from './delete-multi-order-dialog'

type Props = {
  setSortedOrders: Dispatch<SetStateAction<SelectedIcuOrder[]>>
  isCommandPressed: boolean
  multiOrderPendingQueue: Partial<SelectedIcuOrder>[]
  resetOrderStore: () => void
  setCopiedOrderPendingQueue: Dispatch<
    SetStateAction<Partial<SelectedIcuOrder>[]>
  >
  setMultiOrderPendingQueue: Dispatch<
    SetStateAction<Partial<SelectedIcuOrder>[]>
  >
}

export default function MultiOrderDialog({
  setSortedOrders,
  isCommandPressed,
  multiOrderPendingQueue,
  resetOrderStore,
  setCopiedOrderPendingQueue,
  setMultiOrderPendingQueue,
}: Props) {
  const [isMultiOrderDialogOpen, setIsMultiOrderDialogOpen] = useState(false)

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) {
      setMultiOrderPendingQueue([])
    }
    setIsMultiOrderDialogOpen(open)
  }

  useEffect(() => {
    !isCommandPressed &&
      multiOrderPendingQueue.length > 0 &&
      setIsMultiOrderDialogOpen(true)
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [isCommandPressed])

  return (
    <Dialog open={isMultiOrderDialogOpen} onOpenChange={handleDialogOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {multiOrderPendingQueue.length}개의 오더 선택됨
          </DialogTitle>
          <VisuallyHidden>
            <DialogDescription />
          </VisuallyHidden>
        </DialogHeader>

        <CopyMultiOrderButton
          setIsMultiOrderDialogOpen={setIsMultiOrderDialogOpen}
          multiOrderPendingQueue={multiOrderPendingQueue}
          setCopiedOrderPendingQueue={setCopiedOrderPendingQueue}
          setMultiOrderPendingQueue={setMultiOrderPendingQueue}
        />

        <AddMultiOrderToTemplateDialog
          setIsMultiOrderDialogOpen={setIsMultiOrderDialogOpen}
        />

        <BorderMultiOrderButton
          setIsMultiOrderDialogOpen={setIsMultiOrderDialogOpen}
        />

        <DeleteSelectedOrdersDialog
          setIsMultiOrderDialogOpen={setIsMultiOrderDialogOpen}
          setSortedOrders={setSortedOrders}
        />
      </DialogContent>
    </Dialog>
  )
}
