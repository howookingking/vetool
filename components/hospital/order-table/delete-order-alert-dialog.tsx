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
import { deleteDefaultChartOrder } from '@/lib/services/admin/icu/default-orders'
import { deleteOrder } from '@/lib/services/icu/chart/order-mutation'
import { useTemplateStore } from '@/lib/store/icu/template'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { useRouter } from 'next/navigation'

export default function DeleteOrderAlertDialog({
  selectedChartOrder,
  setOrderStep,
  mode,
}: {
  selectedChartOrder: Partial<SelectedIcuOrder>
  setOrderStep: (orderStep: 'closed' | 'upsert' | 'selectOrderer') => void
  mode: 'default' | 'addTemplate' | 'editTemplate'
}) {
  const { refresh } = useRouter()
  const { orderIndex, templateOrders, setTemplateOrders } = useTemplateStore()
  const { order_id } = selectedChartOrder

  const handleDeleteOrderClick = async () => {
    if (mode === 'default') {
      await deleteDefaultChartOrder(selectedChartOrder.order_id!)
    }

    if (mode !== 'default') {
      const newOrders = templateOrders.filter(
        (_, index) => index !== orderIndex,
      )

      if (order_id) {
        await deleteOrder(order_id)
      }

      setTemplateOrders(newOrders)
    }

    toast({
      title: `오더를 삭제하였습니다`,
    })

    setOrderStep('closed')
    refresh()
  }

  return (
    <AlertDialog>
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
          <AlertDialogTitle>오더 삭제</AlertDialogTitle>
          <AlertDialogDescription>
            선택한 오더를 삭제합니다
            <WarningMessage text="해당작업은 실행 후 되될릴 수 없습니다." />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
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
