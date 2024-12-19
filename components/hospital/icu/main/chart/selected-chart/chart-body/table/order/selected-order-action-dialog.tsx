import { Dispatch, SetStateAction, useEffect } from 'react'
import { Copy, BookmarkPlus, Square, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/components/ui/use-toast'
import { useTemplateStore } from '@/lib/store/icu/template'
import { updateIsBordered } from '@/lib/services/icu/chart/order-mutation'

type SelectedOrderActionDialogProps = {
  isOrderActionDialogOpen: boolean
  setIsOrderActionDialogOpen: Dispatch<SetStateAction<boolean>>
  selectedOrderPendingQueue: Partial<SelectedIcuOrder>[]
  setIsDeleteOrdersDialogOpen: Dispatch<SetStateAction<boolean>>
  setIsAddTemplateDialogOpen: Dispatch<SetStateAction<boolean>>
  setSelectedOrderPendingQueue: (
    updater:
      | Partial<SelectedIcuOrder>[]
      | ((prev: Partial<SelectedIcuOrder>[]) => Partial<SelectedIcuOrder>[]),
  ) => void
  setCopiedOrderPendingQueue: (
    updater:
      | Partial<SelectedIcuOrder>[]
      | ((prev: Partial<SelectedIcuOrder>[]) => Partial<SelectedIcuOrder>[]),
  ) => void
}

export default function SelectedOrderActionDialog({
  isOrderActionDialogOpen,
  setIsOrderActionDialogOpen,
  selectedOrderPendingQueue,
  setIsDeleteOrdersDialogOpen,
  setIsAddTemplateDialogOpen,
  setSelectedOrderPendingQueue,
  setCopiedOrderPendingQueue,
}: SelectedOrderActionDialogProps) {
  const { setTemplateOrders } = useTemplateStore()

  useEffect(() => {
    if (!isOrderActionDialogOpen) {
      setSelectedOrderPendingQueue([])
    }
  }, [isOrderActionDialogOpen, setSelectedOrderPendingQueue])

  // 오더 복사 핸들러
  const handleCopyOrder = () => {
    if (selectedOrderPendingQueue.length > 0) {
      // copy order pending queue에 오더 저장
      setCopiedOrderPendingQueue(selectedOrderPendingQueue)

      toast({
        title: '오더 복사 완료',
        description: '붙여넣기 할 차트로 이동해주세요',
      })
    }

    // Dialog close
    setIsOrderActionDialogOpen(false)
  }

  // 오더 템플릿 저장 핸들러
  const handleTemplateOrder = () => {
    if (selectedOrderPendingQueue.length > 0) {
      setTemplateOrders(selectedOrderPendingQueue)

      // 템플릿 추가 Dialog Open
      setIsAddTemplateDialogOpen(true)
    }

    // Dialog close
    setIsOrderActionDialogOpen(false)
  }

  const handleBorderOrder = async () => {
    if (selectedOrderPendingQueue.length > 0) {
      selectedOrderPendingQueue.forEach(async (order) => {
        await updateIsBordered(order.order_id!, order.is_bordered!)
      })

      toast({
        title: '오더 테두리 변경',
        description: '오더 테두리 정보를 변경하였습니다',
      })
    }

    setIsOrderActionDialogOpen(false)
  }

  // 오더 삭제 핸들러
  const handleDeleteOrder = () => {
    // 오더 삭제 Dialog Open
    setIsDeleteOrdersDialogOpen(true)
  }

  return (
    <Dialog
      open={isOrderActionDialogOpen}
      onOpenChange={setIsOrderActionDialogOpen}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {selectedOrderPendingQueue.length}개의 오더 선택됨
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <Button
          onClick={handleCopyOrder}
          className="mt-4 flex items-center justify-start gap-2 text-base"
          variant="ghost"
        >
          <Copy size={24} />
          오더 복사
        </Button>

        <Separator orientation="horizontal" />

        <Button
          onClick={handleTemplateOrder}
          className="flex items-center justify-start gap-2 text-base"
          variant="ghost"
        >
          <BookmarkPlus size={24} />
          템플릿으로 저장
        </Button>

        <Separator orientation="horizontal" />

        <Button
          onClick={handleBorderOrder}
          className="flex items-center justify-start gap-2 text-base"
          variant="ghost"
        >
          <Square size={24} />
          테두리 표시 변경
        </Button>

        <Separator orientation="horizontal" />

        <Button
          onClick={handleDeleteOrder}
          className="flex items-center justify-start gap-2 text-base"
          variant="ghost"
        >
          <Trash2 size={24} />
          오더 삭제
        </Button>

        <DialogFooter className="ml-auto w-full gap-2 md:gap-0">
          <DialogClose asChild>
            <Button type="button" variant="outline" tabIndex={-1}>
              닫기
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
