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
import { Spinner } from '@/components/ui/spinner'
import { deleteDefaultChartOrder } from '@/lib/services/admin/icu/default-orders'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { useRouter } from 'next/navigation'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { toast } from 'sonner'

type Props = {
  order: Partial<SelectedIcuOrder>
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
  setSortedOrders: Dispatch<SetStateAction<SelectedIcuOrder[]>>
  isTemplate?: boolean
  isLastDefaultOrder?: boolean
}

export default function DtDeleteOrderAlertDialog({
  order,
  setIsDialogOpen,
  setSortedOrders,
  isTemplate,
  isLastDefaultOrder,
}: Props) {
  const { refresh } = useRouter()

  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!isTemplate && isLastDefaultOrder) {
      toast.warning('기본오더는 적어도 1개 이상이여야 합니다')
      return
    }

    setIsDeleting(true)

    setSortedOrders((prev) =>
      prev.filter((o) => o.icu_chart_order_id !== order.icu_chart_order_id),
    )

    if (!isTemplate) {
      await deleteDefaultChartOrder(order.icu_chart_order_id!)
      toast.success(`${order.icu_chart_order_name} 오더를 삭제하였습니다`)
    }

    setIsDeleting(false)
    setIsDialogOpen(false)
    !isTemplate && setTimeout(refresh, 100)
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
            {order.icu_chart_order_name} 오더 삭제
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
            onClick={handleDelete}
            disabled={isDeleting}
          >
            삭제
            {isDeleting ? <Spinner /> : null}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
