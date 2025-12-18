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
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'

type Props = {
  hosId: string
  setSortedOrders: Dispatch<SetStateAction<SelectedIcuOrder[]>>
  isCommandPressed: boolean
}

export default function MultiOrderDialog({
  hosId,
  setSortedOrders,
  isCommandPressed,
}: Props) {
  const {
    multiOrderPendingQueue,
    setCopiedOrderPendingQueue,
    setMultiOrderPendingQueue,
  } = useIcuOrderStore()

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
          multiOrderPendingQueue={multiOrderPendingQueue}
          setCopiedOrderPendingQueue={setCopiedOrderPendingQueue}
          setIsMultiOrderDialogOpen={setIsMultiOrderDialogOpen}
          setMultiOrderPendingQueue={setMultiOrderPendingQueue}
        />

        <AddMultiOrderToTemplateDialog
          hosId={hosId}
          multiOrderPendingQueue={multiOrderPendingQueue}
          setMultiOrderPendingQueue={setMultiOrderPendingQueue}
          setIsMultiOrderDialogOpen={setIsMultiOrderDialogOpen}
        />

        <BorderMultiOrderButton
          multiOrderPendingQueue={multiOrderPendingQueue}
          setMultiOrderPendingQueue={setMultiOrderPendingQueue}
          setIsMultiOrderDialogOpen={setIsMultiOrderDialogOpen}
        />

        <DeleteSelectedOrdersDialog
          multiOrderPendingQueue={multiOrderPendingQueue}
          setMultiOrderPendingQueue={setMultiOrderPendingQueue}
          setIsMultiOrderDialogOpen={setIsMultiOrderDialogOpen}
          setSortedOrders={setSortedOrders}
        />
      </DialogContent>
    </Dialog>
  )
}
