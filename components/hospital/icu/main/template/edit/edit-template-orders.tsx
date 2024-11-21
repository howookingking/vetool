import LargeLoaderCircle from '@/components/common/large-loader-circle'
import TemplateOrdersTable from '@/components/hospital/icu/main/template/add/template-orders-table'
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
import { getOrder, upsertOrder } from '@/lib/services/icu/chart/order-mutation'
import { useTemplateStore } from '@/lib/store/icu/template'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { useParams } from 'next/navigation'
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'

export default function EditTemplateOrders({
  chartId,
  templateName,
  isNextStep,
  setIsNextStep,
}: {
  chartId: string
  templateName: string
  isNextStep: boolean
  setIsNextStep: Dispatch<SetStateAction<boolean>>
}) {
  const { hos_id } = useParams()
  const {
    templateOrders,
    setTemplateOrders,
    reset,
    isTemplateDialogOpen,
    setIsTemplateDialogOpen,
  } = useTemplateStore()

  const [isEditing, setIsEditing] = useState(false)
  const [isSorting, setIsSorting] = useState(false)
  const [initialOrders, setInitialOrders] = useState<
    Partial<SelectedIcuOrder>[]
  >([])

  const fetchOrders = useCallback(async () => {
    setIsEditing(true)

    const orders = await getOrder(chartId)
    const formattedOrders = orders.map((order) => ({
      order_id: order.icu_chart_order_id,
      order_name: order.icu_chart_order_name,
      order_type: order.icu_chart_order_type,
      order_times: order.icu_chart_order_time,
      order_comment: order.icu_chart_order_comment || null,
    }))

    setTemplateOrders(formattedOrders)
    setInitialOrders(formattedOrders)

    setIsEditing(false)
  }, [chartId, setTemplateOrders])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  const handleNextButtonClick = async () => {
    const hasChanges =
      JSON.stringify(initialOrders) !== JSON.stringify(templateOrders)

    if (!hasChanges) {
      setIsNextStep(true)
      return
    }

    if (templateOrders.length) {
      templateOrders.forEach(async (order) => {
        await upsertOrder(
          hos_id as string,
          chartId,
          order.order_id,
          order.order_times as string[],
          {
            icu_chart_order_name: order.order_name!,
            icu_chart_order_comment: order.order_comment!,
            icu_chart_order_type: order.order_type!,
          },
        )
      })
    }

    setIsNextStep(true)
  }

  const handleDialogOpen = () => {
    setIsTemplateDialogOpen(!isTemplateDialogOpen)
    reset()
  }

  return (
    <Dialog open={!isNextStep} onOpenChange={handleDialogOpen}>
      <DialogTrigger asChild></DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{templateName} 템플릿 수정</DialogTitle>
          <DialogDescription>
            {templateName} 템플릿의 오더를 수정합니다
          </DialogDescription>
        </DialogHeader>

        {isEditing ? (
          <LargeLoaderCircle />
        ) : (
          templateOrders.length > 0 && (
            <TemplateOrdersTable
              initialOrders={initialOrders}
              isSorting={isSorting}
              setIsSorting={setIsSorting}
              editTemplateMode
            />
          )
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button tabIndex={-1} variant="outline">
              닫기
            </Button>
          </DialogClose>

          <Button disabled={isSorting} onClick={handleNextButtonClick}>
            다음
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
