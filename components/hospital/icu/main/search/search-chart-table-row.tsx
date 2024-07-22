import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { DEFAULT_ICU_ORDER_TYPE } from '@/constants/hospital/icu/chart/order'
import { selectedChartOrderList } from '@/lib/services/icu/select-chart-list'
import { useCopiedChartStore } from '@/lib/store/icu/copied-chart'
import { useOrderPreviewStore } from '@/lib/store/icu/order-preview'
import { cn } from '@/lib/utils'
import { LoaderCircle } from 'lucide-react'
import { useState } from 'react'

export default function SearchChartTableRow({
  name,
  dx,
  cc,
  targetDate,
  chartId,
  type,
}: {
  name: string
  dx: string | null
  cc: string | null
  targetDate: string
  chartId: string
  type: 'search' | 'register' | 'bookmark'
}) {
  const { setPreviewModalOpen } = useOrderPreviewStore()
  const {
    setSelectedTargetDate,
    setCopiedChartId,
    setCopiedChartOrder,
    setIsCopyDialogOpen,
  } = useCopiedChartStore()

  const rowData = [name, dx, cc, targetDate]
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fetchChartOrderList = async () => {
    const fetchedChartOrders = await selectedChartOrderList(chartId)

    const selectedChartOrders = fetchedChartOrders.sort(
      (prev, next) =>
        DEFAULT_ICU_ORDER_TYPE.map((order) => order.value).findIndex(
          (order) => order === prev.icu_chart_order_type,
        ) -
        DEFAULT_ICU_ORDER_TYPE.map((order) => order.value).findIndex(
          (order) => order === next.icu_chart_order_type,
        ),
    )

    setCopiedChartOrder(selectedChartOrders)
    setCopiedChartId(chartId)
  }

  const handleOpenChartPreviewDialog = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.stopPropagation()

    setPreviewModalOpen(true)
    setCopiedChartId(chartId)
    setSelectedTargetDate(targetDate)
    fetchChartOrderList()
  }

  const handleCopyChartOrder = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.stopPropagation()

    setIsSubmitting(true)

    await fetchChartOrderList()

    if (type === 'register') {
      setIsCopyDialogOpen(true)
    } else {
      toast({
        title: '차트 복사 완료',
        description: '해당 차트가 클립보드에 복사되었습니다',
      })
    }

    setIsSubmitting(false)
  }

  return (
    <div className="relative flex w-full items-center border-b text-sm transition-colors hover:bg-accent hover:text-accent-foreground">
      {rowData.map((data, index) => (
        <span
          key={index}
          className="flex h-10 w-full items-center justify-center font-normal text-foreground"
        >
          {data ?? '없음'}
        </span>
      ))}

      <div className="flex w-full justify-center">
        <Button onClick={handleOpenChartPreviewDialog} className="h-6">
          미리보기
        </Button>
      </div>

      <div className="flex w-full justify-center">
        <Button
          onClick={handleCopyChartOrder}
          className="h-6"
          disabled={isSubmitting}
        >
          {type === 'register' ? '선택' : '복사'}
          <LoaderCircle
            className={cn(isSubmitting ? 'ml-2 animate-spin' : 'hidden')}
          />
        </Button>
      </div>
    </div>
  )
}
