import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { toast } from '@/components/ui/use-toast'
import { updateIsBordered } from '@/lib/services/icu/chart/order-mutation'
import { type SelectedIcuOrder } from '@/types/icu/chart'
import { Bookmark, Copy, Square, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { type Dispatch, type SetStateAction, useEffect } from 'react'

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
  const { refresh } = useRouter()

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
        description: '붙여넣기 할 차트로 이동하여 ctrl + v를 눌러주세요',
      })
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
    refresh()
  }

  const MULTIPLE_ORDER_ACTIONS = [
    {
      name: '오더 복사',
      icon: <Copy />,
      onClick: handleCopyOrder,
    },
    {
      name: '템플릿으로 저장',
      icon: <Bookmark />,
      onClick: () => setIsAddTemplateDialogOpen(true),
    },
    {
      name: '테두리 표시 변경',
      icon: <Square />,
      onClick: handleBorderOrder,
    },
    {
      name: '오더 삭제',
      icon: <Trash2 />,
      onClick: () => setIsDeleteOrdersDialogOpen(true),
    },
  ]

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

        {MULTIPLE_ORDER_ACTIONS.map((action) => (
          <Button
            key={action.name}
            onClick={action.onClick}
            className="flex items-center justify-start gap-2 py-5 text-base"
            variant="outline"
          >
            {action.icon}
            {action.name}
          </Button>
        ))}
      </DialogContent>
    </Dialog>
  )
}
