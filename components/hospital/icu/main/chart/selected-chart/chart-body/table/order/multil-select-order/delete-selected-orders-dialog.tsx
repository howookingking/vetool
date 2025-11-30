import WarningMessage from '@/components/common/warning-message'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { deleteOrder } from '@/lib/services/icu/chart/order-mutation'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { Trash2Icon } from 'lucide-react'
import { type Dispatch, type SetStateAction } from 'react'
import { toast } from 'sonner'

type DeleteSelectedOrdersDialogProps = {
  setIsMultiSelectOrderActionDialogOpen: Dispatch<SetStateAction<boolean>>
  setSortedOrders: Dispatch<SetStateAction<SelectedIcuOrder[]>>
}

export default function DeleteSelectedOrdersDialog({
  setIsMultiSelectOrderActionDialogOpen,
  setSortedOrders,
}: DeleteSelectedOrdersDialogProps) {
  const { reset: orderReset, selectedOrderPendingQueue } = useIcuOrderStore()

  const handleDeleteOrderClick = async () => {
    setSortedOrders((prev) =>
      prev.filter((order) => !selectedOrderPendingQueue.includes(order)),
    )

    selectedOrderPendingQueue.forEach(async (order) => {
      await deleteOrder(order.order_id!)
    })

    toast.success('오더를 삭제하였습니다')

    setIsMultiSelectOrderActionDialogOpen(false)
    orderReset()
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="flex items-center justify-start gap-2 py-5 text-base"
          variant="outline"
        >
          <Trash2Icon />
          오더 삭제
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {selectedOrderPendingQueue.length}개의 오더 삭제
          </AlertDialogTitle>
          <AlertDialogDescription>
            선택한 오더를 삭제합니다
            <WarningMessage text="해당작업은 실행 후 되될릴 수 없습니다." />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel tabIndex={-1}>닫기</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive hover:bg-destructive/80"
            onClick={handleDeleteOrderClick}
          >
            삭제
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
