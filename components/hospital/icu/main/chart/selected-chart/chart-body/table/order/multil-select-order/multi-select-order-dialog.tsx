import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { type SelectedIcuOrder } from '@/types/icu/chart'
import { type Dispatch, type SetStateAction } from 'react'
import AddSelectedOrdersToTemplateDialog from './add-selected-orders-to-template-dialog'
import BorderSelectedOrdersButton from './border-selected-orders-button'
import CopySelectedOrdersButton from './copy-selected-orders'
import DeleteSelectedOrdersDialog from './delete-selected-orders-dialog'

type MultiSelectOrderDialogProps = {
  isMultiOrderDialogOpen: boolean
  setIsMultiOrderDialogOpen: Dispatch<SetStateAction<boolean>>
  setSortedOrders: Dispatch<SetStateAction<SelectedIcuOrder[]>>
}

export default function MultiSelectOrderDialog({
  isMultiOrderDialogOpen,
  setIsMultiOrderDialogOpen,
  setSortedOrders,
}: MultiSelectOrderDialogProps) {
  const { selectedOrderPendingQueue, reset: orderReset } = useIcuOrderStore()

  const handleDialogOpenChange = (open: boolean) => {
    setIsMultiOrderDialogOpen(open)
    if (!open) {
      orderReset()
    }
  }

  return (
    <Dialog open={isMultiOrderDialogOpen} onOpenChange={handleDialogOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {selectedOrderPendingQueue.length}개의 오더 선택됨
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>

        {/* 선택된 오더들 복사 */}
        <CopySelectedOrdersButton
          setIsMultiSelectOrderActionDialogOpen={setIsMultiOrderDialogOpen}
        />

        {/* 선택된 오더들 템플릿으로 저장 */}
        <AddSelectedOrdersToTemplateDialog
          setIsMultiOrderDialogOpen={setIsMultiOrderDialogOpen}
        />

        {/* 선택된 오더들에 테두리 변경 */}
        <BorderSelectedOrdersButton
          setIsMultiSelectOrderActionDialogOpen={setIsMultiOrderDialogOpen}
        />

        {/* 선택된 오더들 삭제 */}
        <DeleteSelectedOrdersDialog
          setIsMultiSelectOrderActionDialogOpen={setIsMultiOrderDialogOpen}
          setSortedOrders={setSortedOrders}
        />
      </DialogContent>
    </Dialog>
  )
}
