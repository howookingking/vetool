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
import { Spinner } from '@/components/ui/spinner'
import useOrderSorting from '@/hooks/use-order-sorting'
import { getTemplateChart } from '@/lib/services/icu/template/template'
import { useDtOrderTimePendingQueueStore } from '@/lib/store/icu/dt-order'
import type { IcuTemplate } from '@/types'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { Edit2Icon, PlusIcon } from 'lucide-react'
import { useState } from 'react'
import ConfirmAddTemplateDialog from './confirm-add-template-dialog'
import TemplateOrderTable from './template-order-table'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

type Props = EditTemplateProps | NewTemplateProps

type EditTemplateProps = {
  hosId: string
  isEdit: true
  template: IcuTemplate
}

type NewTemplateProps = {
  hosId: string
  isEdit: false
  template: null
}

const EMPTY_ORDERS: SelectedIcuOrder[] = []

export default function UpsertTemplateDialog({
  hosId,
  isEdit,
  template,
}: Props) {
  const [isFetching, setIsFetching] = useState(false)
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

  const handleOpenChange = async (open: boolean) => {
    if (open) {
      setSortedOrders([])
      resetTimePendingQueue()

      if (isEdit) {
        setIsFetching(true)

        const chartData = await getTemplateChart(template.icu_chart_id)
        setSortedOrders(chartData.orders)

        setIsFetching(false)
      }
      setIsUpsertTemplateDialogOpen(open)
    } else {
      setIsUpsertTemplateDialogOpen(open)
    }
  }

  return (
    <Dialog open={isUpsertTemplateDialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant={isEdit ? 'ghost' : 'default'}
          className={isEdit ? '' : 'fixed bottom-16 right-6 rounded-full'}
          disabled={isFetching}
        >
          {isEdit ? (
            <>{isFetching ? <Spinner /> : <Edit2Icon />}</>
          ) : (
            <PlusIcon />
          )}
        </Button>
      </DialogTrigger>

      <DialogContent
        className="md:max-w-[1600px]"
        onInteractOutside={(e) => {
          e.preventDefault()
        }}
      >
        <DialogHeader>
          <DialogTitle>{isEdit ? `템플릿 수정` : '템플릿 만들기'}</DialogTitle>
          <VisuallyHidden>
            <DialogDescription />
          </VisuallyHidden>
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
            selectedTemplateChart={template}
            hosId={hosId}
            orderTimePendingQueue={orderTimePendingQueue}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
