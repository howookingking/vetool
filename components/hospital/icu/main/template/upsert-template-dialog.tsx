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
import type { IcuTemplate } from '@/types'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { useEffect, useRef, type Dispatch, type SetStateAction } from 'react'
import ConfirmAddTemplateDialog from './confirm-add-template-dialog'
import TemplateOrderTable from './template-order-table'

type Props = {
  isUpsertTemplateDialogOpen: boolean
  setIsUpsertTemplateDialogOpen: Dispatch<SetStateAction<boolean>>
  sortedOrders: SelectedIcuOrder[]
  setSortedOrders: Dispatch<SetStateAction<SelectedIcuOrder[]>>
  isEdit: boolean
  setIsEdit: Dispatch<SetStateAction<boolean>>
  selectedTemplateChart: IcuTemplate | null
  setSelectedTemplateChart: Dispatch<SetStateAction<IcuTemplate | null>>
}

export default function UpsertTemplateDialog({
  isUpsertTemplateDialogOpen,
  setIsUpsertTemplateDialogOpen,
  sortedOrders,
  setSortedOrders,
  isEdit,
  setIsEdit,
  selectedTemplateChart,
  setSelectedTemplateChart,
}: Props) {
  // const { reset } = useDtOrderStore()

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setSortedOrders([])
      setSelectedTemplateChart(null)
      setIsEdit(false)
      // reset()
    }
    setIsUpsertTemplateDialogOpen(open)
  }

  // Scroll to the bottom when new order is added
  const scrollRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [sortedOrders])

  return (
    <Dialog open={isUpsertTemplateDialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild className="absolute right-2 top-2">
        <Button className="h-[34px]">템풀릿 만들기</Button>
      </DialogTrigger>

      <DialogContent
        className="md:max-w-[1600px]"
        onInteractOutside={(e) => {
          e.preventDefault()
        }}
      >
        <DialogHeader>
          <DialogTitle>
            {isEdit
              ? `${selectedTemplateChart?.template_name} 템플릿 수정`
              : '템플릿 만들기'}
          </DialogTitle>
          <DialogDescription>자유롭게 템플릿을 만들어주세요</DialogDescription>
        </DialogHeader>

        <div ref={scrollRef} className="max-h-[680px] overflow-auto">
          <TemplateOrderTable
            setSortedOrders={setSortedOrders}
            sortedOrders={sortedOrders}
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">닫기</Button>
          </DialogClose>

          <ConfirmAddTemplateDialog
            sortedOrders={sortedOrders}
            setIsUpsertTemplateDialogOpen={setIsUpsertTemplateDialogOpen}
            isEdit={isEdit}
            selectedTemplateChart={selectedTemplateChart}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
