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
} from '@/components/ui/alert-dialog'
import { toast } from '@/components/ui/use-toast'
import { deleteOrder } from '@/lib/services/icu/chart/order-mutation'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { Dispatch, SetStateAction, useEffect, useRef } from 'react'

export default function DeleteOrdersAlertDialog({
  isDeleteOrdersDialogOpen,
  setIsDeleteOrdersDialogOpen,
}: {
  isDeleteOrdersDialogOpen: boolean
  setIsDeleteOrdersDialogOpen: Dispatch<SetStateAction<boolean>>
}) {
  const { reset, selectedOrderPendingQueue } = useIcuOrderStore()
  const deleteButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (isDeleteOrdersDialogOpen) {
      setTimeout(() => deleteButtonRef.current?.focus(), 0)
    }
  }, [isDeleteOrdersDialogOpen])

  const handleDeleteOrderClick = async () => {
    selectedOrderPendingQueue.forEach(async (order) => {
      await deleteOrder(order.order_id!)
    })

    toast({
      title: `오더를 삭제하였습니다`,
    })
    setIsDeleteOrdersDialogOpen(false)
    reset()
  }

  return (
    <AlertDialog
      open={isDeleteOrdersDialogOpen}
      onOpenChange={setIsDeleteOrdersDialogOpen}
    >
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
          <AlertDialogCancel tabIndex={-1}>취소</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive hover:bg-destructive/80"
            onClick={handleDeleteOrderClick}
            ref={deleteButtonRef}
          >
            삭제
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}