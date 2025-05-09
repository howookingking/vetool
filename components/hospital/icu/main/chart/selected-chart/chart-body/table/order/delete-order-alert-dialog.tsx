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
import { toast } from '@/components/ui/use-toast'
import { deleteOrder } from '@/lib/services/icu/chart/order-mutation'
import { type OrderStep } from '@/lib/store/icu/icu-order'
import { type SelectedIcuOrder } from '@/types/icu/chart'
import { type Dispatch, type SetStateAction, useState } from 'react'

type DeleteOrderAlertDialogProps = {
  selectedChartOrder: Partial<SelectedIcuOrder>
  setOrderStep: (orderStep: OrderStep) => void
  setSortedOrders: Dispatch<SetStateAction<SelectedIcuOrder[]>>
}

export default function DeleteOrderAlertDialog({
  selectedChartOrder,
  setOrderStep,
  setSortedOrders,
}: DeleteOrderAlertDialogProps) {
  const [isDeleteOrdersDialogOpen, setIsDeleteOrdersDialogOpen] =
    useState(false)

  const handleDeleteOrderClick = async () => {
    setIsDeleteOrdersDialogOpen(false)
    setOrderStep('closed')

    setSortedOrders((prev) =>
      prev.filter((order) => order.order_id !== selectedChartOrder.order_id),
    )

    await deleteOrder(selectedChartOrder.order_id!)

    toast({
      title: `${selectedChartOrder.order_name} 오더를 삭제하였습니다`,
    })
    setOrderStep('closed')
  }

  return (
    <AlertDialog
      open={isDeleteOrdersDialogOpen}
      onOpenChange={setIsDeleteOrdersDialogOpen}
    >
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          className="mr-auto"
          variant="destructive"
          tabIndex={-1}
        >
          삭제
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {selectedChartOrder.order_name} 오더 삭제
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
          >
            삭제
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
