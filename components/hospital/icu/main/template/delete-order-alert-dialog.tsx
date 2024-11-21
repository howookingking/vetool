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
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { useTemplateStore } from '@/lib/store/icu/template'
import { useRef, useState } from 'react'

export default function DeleteOrdersAlertDialog({
  orderIndex,
  orderName,
  orderId,
}: {
  orderIndex: number
  orderName: string
  orderId?: string
}) {
  const [isDeleteOrdersDialogOpen, setIsDeleteOrdersDialogOpen] =
    useState(false)
  const { setOrderStep } = useIcuOrderStore()
  const { templateOrders, setTemplateOrders } = useTemplateStore()
  const deleteButtonRef = useRef<HTMLButtonElement>(null)

  const handleDeleteOrderClick = async () => {
    const newOrders = templateOrders.filter((_, index) => index !== orderIndex)

    if (orderId) {
      await deleteOrder(orderId)
    }

    setTemplateOrders(newOrders)
    setOrderStep('closed')

    toast({
      title: `오더를 삭제하였습니다`,
    })

    setIsDeleteOrdersDialogOpen(false)
  }

  return (
    <AlertDialog
      open={isDeleteOrdersDialogOpen}
      onOpenChange={setIsDeleteOrdersDialogOpen}
    >
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          type="button"
          className="mr-auto"
          tabIndex={-1}
        >
          삭제
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{orderName} 오더 삭제</AlertDialogTitle>
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
