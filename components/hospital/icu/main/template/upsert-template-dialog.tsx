import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import useOrderSorting from '@/hooks/use-order-sorting'
import { useDtOrderTimePendingQueueStore } from '@/lib/store/icu/dt-order'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { Edit2Icon, PlusIcon } from 'lucide-react'
import { useState } from 'react'
import ConfirmAddTemplateDialog from './confirm-add-template-dialog'
import TemplateOrderTable from './template-order-table'

type Props = {
  isEdit?: boolean
  hosId: string
}

const EMPTY_ORDERS: SelectedIcuOrder[] = []

export default function UpsertTemplateDialog({ isEdit, hosId }: Props) {
  const [isUpsertTemplateDialogOpen, setIsUpsertTemplateDialogOpen] =
    useState(false)
  const { orderTimePendingQueue, resetTimePendingQueue } =
    useDtOrderTimePendingQueueStore()

  const {
    handleOrderMove,
    handleSortToggle,
    isSorting,
    setSortedOrders,
    sortedOrders,
  } = useOrderSorting({
    initialOrders: EMPTY_ORDERS,
    type: 'template',
    enabled: isUpsertTemplateDialogOpen,
  })

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setSortedOrders([])
      resetTimePendingQueue()
    }
    setIsUpsertTemplateDialogOpen(open)
  }

  return (
    <Dialog open={isUpsertTemplateDialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger
        asChild
        className={
          isEdit ? 'rounded-full' : 'fixed bottom-16 right-6 z-50 rounded-full'
        }
      >
        <Button size="icon">{isEdit ? <Edit2Icon /> : <PlusIcon />}</Button>
      </DialogTrigger>

      <DialogContent
        className="md:max-w-[1600px]"
        onInteractOutside={(e) => {
          e.preventDefault()
        }}
      >
        <DialogHeader>
          <DialogTitle>{isEdit ? `템플릿 수정` : '템플릿 만들기'}</DialogTitle>
          <DialogDescription>자유롭게 템플릿을 만들어주세요</DialogDescription>
        </DialogHeader>

        <div className="max-h-[800px] overflow-scroll">
          <TemplateOrderTable
            sortedOrders={sortedOrders}
            isSorting={isSorting}
            handleSortToggle={handleSortToggle}
            handleOrderMove={handleOrderMove}
            setSortedOrders={setSortedOrders}
            hosId={hosId}
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">닫기</Button>
          </DialogClose>

          <ConfirmAddTemplateDialog
            isSorting={isSorting}
            sortedOrders={sortedOrders}
            isEdit={isEdit}
            setIsUpsertTemplateDialogOpen={setIsUpsertTemplateDialogOpen}
            selectedTemplateChart={null}
            hosId={hosId}
            orderTimePendingQueue={orderTimePendingQueue}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
