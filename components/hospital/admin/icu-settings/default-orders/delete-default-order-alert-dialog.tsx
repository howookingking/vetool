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
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { useRouter } from 'next/navigation'

export default function DeleteDefaultOrderAlertDialog({
  selectedChartOrder,
  setOrderStep,
}: {
  selectedChartOrder: Partial<SelectedIcuOrder>
  setOrderStep: (orderStep: 'closed' | 'upsert' | 'selectOrderer') => void
}) {
  const { refresh } = useRouter()
  const handleDeleteOrderClick = async () => {
    await deleteDefaultChartOrder(selectedChartOrder.order_id!)

    toast({
      title: `${selectedChartOrder.order_name} 오더를 삭제하였습니다`,
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
          <AlertDialogTitle>
            {selectedChartOrder.order_name} 오더 삭제
          </AlertDialogTitle>
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
