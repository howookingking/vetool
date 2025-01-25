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
import { type SelectedIcuOrder } from '@/types/icu/chart'
import { useState } from 'react'
import ConfirmAddTemplateDialog from './confirm-add-template-dialog'
import TemplateOrderTable from './template-order-table'

export default function AddTemplateDialog() {
  const [isAddTemplateDialogOpen, setIsAddTemplateDialogOpen] = useState(false)
  const [sortedOrders, setSortedOrders] = useState<SelectedIcuOrder[]>([])

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setSortedOrders([])
    }
    setIsAddTemplateDialogOpen(open)
  }

  return (
    <Dialog open={isAddTemplateDialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild className="absolute right-0 top-0">
        <Button className="h-[34px]">템풀릿 만들기</Button>
      </DialogTrigger>
      <DialogContent
        className="md:max-w-[1600px]"
        onInteractOutside={(e) => {
          e.preventDefault()
        }}
      >
        <DialogHeader>
          <DialogTitle>템플릿 만들기</DialogTitle>
          <DialogDescription>자유롭게 템플릿을 만들어주세요</DialogDescription>
        </DialogHeader>

        <TemplateOrderTable
          setSortedOrders={setSortedOrders}
          sortedOrders={sortedOrders}
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">취소</Button>
          </DialogClose>

          <ConfirmAddTemplateDialog
            sortedOrders={sortedOrders}
            setIsAddTemplateDialogOpen={setIsAddTemplateDialogOpen}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
