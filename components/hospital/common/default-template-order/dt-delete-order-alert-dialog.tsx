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
import { deleteDefaultChartOrder } from '@/lib/services/admin/icu/default-orders'
import { type OrderStep } from '@/lib/store/icu/icu-order'
import { type SelectedIcuOrder } from '@/types/icu/chart'
import { useRouter } from 'next/navigation'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { toast } from 'sonner'

type Props = {
  selectedChartOrder: Partial<SelectedIcuOrder>
  setOrderStep: (orderStep: OrderStep) => void
  setSortedOrders: Dispatch<SetStateAction<SelectedIcuOrder[]>>
  isTemplate?: boolean
  isLastDefaultOrder?: boolean
}

export default function DtDeleteOrderAlertDialog({
  selectedChartOrder,
  setOrderStep,
  setSortedOrders,
  isTemplate,
  isLastDefaultOrder,
}: Props) {
  const { refresh } = useRouter()

  const [isDeleteOrdersDialogOpen, setIsDeleteOrdersDialogOpen] =
    useState(false)

  const handleDeleteOrderClick = async () => {
    if (!isTemplate && isLastDefaultOrder) {
      toast.warning('기본오더는 적어도 1개 이상이여야 합니다')
      return
    }

    setOrderStep('closed')

    setSortedOrders((prev) =>
      prev.filter((order) => order.order_id !== selectedChartOrder.order_id),
    )

    !isTemplate && (await deleteDefaultChartOrder(selectedChartOrder.order_id!))

    toast.success(`${selectedChartOrder.order_name} 오더를 삭제하였습니다`)

    refresh()
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
