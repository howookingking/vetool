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
import { type TemplateChart } from '@/types/icu/template'
import { type Dispatch, type SetStateAction } from 'react'
import ConfirmAddTemplateDialog from './confirm-add-template-dialog'
import TemplateOrderTable from './template-order-table'

type UpsertTemplateDilaogProps = {
  useUpsertTemplateDialogOpen: boolean
  setUseUpsertTemplateDialogOpen: Dispatch<SetStateAction<boolean>>
  sortedOrders: SelectedIcuOrder[]
  setSortedOrders: Dispatch<SetStateAction<SelectedIcuOrder[]>>
  isEdit: boolean
  setIsEdit: Dispatch<SetStateAction<boolean>>
  selectedTemplateChart: TemplateChart | null
  setSelectedTemplateChart: Dispatch<SetStateAction<TemplateChart | null>>
}

export default function UpsertTemplateDialog({
  useUpsertTemplateDialogOpen,
  setUseUpsertTemplateDialogOpen,
  sortedOrders,
  setSortedOrders,
  isEdit,
  setIsEdit,
  selectedTemplateChart,
  setSelectedTemplateChart,
}: UpsertTemplateDilaogProps) {
  const handleOpenChange = (open: boolean) => {
    // 닫힐때 초기화
    if (open) {
      setSortedOrders([])
      setSelectedTemplateChart(null)
      setIsEdit(false)
    }
    setUseUpsertTemplateDialogOpen(open)
  }

  return (
    <Dialog open={useUpsertTemplateDialogOpen} onOpenChange={handleOpenChange}>
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
          <DialogTitle>
            {isEdit
              ? `${selectedTemplateChart?.template_name} 템플릿 수정`
              : '템플릿 만들기'}
          </DialogTitle>
          <DialogDescription>자유롭게 템플릿을 만들어주세요</DialogDescription>
        </DialogHeader>

        <div className="max-h-[680px] overflow-y-scroll">
          <TemplateOrderTable
            setSortedOrders={setSortedOrders}
            sortedOrders={sortedOrders}
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">취소</Button>
          </DialogClose>

          <ConfirmAddTemplateDialog
            sortedOrders={sortedOrders}
            setUseUpsertTemplateDialogOpen={setUseUpsertTemplateDialogOpen}
            isEdit={isEdit}
            selectedTemplateChart={selectedTemplateChart}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
