import SubmitButton from '@/components/common/submit-button'
import WarningMessage from '@/components/common/warning-message'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useSafeRefresh } from '@/hooks/use-safe-refresh'
import { deleteOrder } from '@/lib/services/icu/chart/order-mutation'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { Trash2Icon } from 'lucide-react'
import { useState, type Dispatch, type SetStateAction } from 'react'
import { toast } from 'sonner'

type Props = {
  setIsMultiOrderDialogOpen: Dispatch<SetStateAction<boolean>>
  setSortedOrders: Dispatch<SetStateAction<SelectedIcuOrder[]>>
  multiOrderPendingQueue: Partial<SelectedIcuOrder>[]
  setMultiOrderPendingQueue: Dispatch<
    SetStateAction<Partial<SelectedIcuOrder>[]>
  >
}

export default function DeleteSelectedOrdersDialog({
  setIsMultiOrderDialogOpen,
  setSortedOrders,
  multiOrderPendingQueue,
  setMultiOrderPendingQueue,
}: Props) {
  const safeRefresh = useSafeRefresh()

  const [isDeleting, setIsDeleting] = useState(false)
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    setSortedOrders((prev) =>
      prev.filter(
        (order) =>
          !multiOrderPendingQueue.some(
            (o) => o.icu_chart_order_id === order.icu_chart_order_id,
          ),
      ),
    )

    await Promise.all(
      multiOrderPendingQueue.map((order) =>
        deleteOrder(order.icu_chart_order_id!),
      ),
    )

    toast.success('오더를 삭제하였습니다')
    setIsDeleting(false)
    setIsAlertDialogOpen(false)
    setIsMultiOrderDialogOpen(false)
    setMultiOrderPendingQueue([])
    safeRefresh()
  }

  return (
    <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button
          className="flex items-center justify-start gap-2 py-5 text-base"
          variant="outline"
        >
          <Trash2Icon />
          삭제
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {multiOrderPendingQueue.length}개의 오더 삭제
          </AlertDialogTitle>
          <AlertDialogDescription>
            선택한 오더를 삭제합니다
            <WarningMessage text="해당작업은 실행 후 되될릴 수 없습니다." />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel tabIndex={-1}>닫기</AlertDialogCancel>

          <SubmitButton
            variant="destructive"
            buttonText="삭제"
            isPending={isDeleting}
            onClick={handleDelete}
          />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
