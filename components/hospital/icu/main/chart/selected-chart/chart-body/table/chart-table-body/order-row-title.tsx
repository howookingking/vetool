import OrderTitleContent from '@/components/hospital/common/order/order-title-content'
import { Button } from '@/components/ui/button'
import { TableCell } from '@/components/ui/table'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { cn, MULTISELECT } from '@/lib/utils/utils'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import type { VitalRefRange } from '@/types/adimin'
import type { SelectedIcuOrder } from '@/types/icu/chart'

type Props = {
  index: number
  order: SelectedIcuOrder
  isSorting?: boolean
  vitalRefRange?: VitalRefRange[]
  species?: string
  orderWidth: number
  targetDate: string
}

export default function OrderRowTitle({
  index,
  order,
  isSorting,
  species,
  orderWidth,
  targetDate,
}: Props) {
  const {
    icu_chart_order_comment,
    icu_chart_order_type,
    icu_chart_order_name,
    treatments,
  } = order

  const isOptimisticOrder = order.icu_chart_order_id.startsWith('temp_order_id')
  const isEvenIndex = index % 2 === 0

  const {
    basicHosData: { orderColorsData, orderFontSizeData, vitalRefRange },
  } = useBasicHosDataContext()

  const {
    setMultiOrderPendingQueue,
    setOrderStep,
    setSelectedChartOrder,
    multiOrderPendingQueue,
  } = useIcuOrderStore()

  const isInOrderPendingQueue = multiOrderPendingQueue.some(
    (o) => o.icu_chart_order_id === order.icu_chart_order_id,
  )

  const handleClickOrderTitle = (e: React.MouseEvent) => {
    // 오더 다중 선택시
    if (e.metaKey || e.ctrlKey) {
      e.preventDefault()
      setMultiOrderPendingQueue!((prev) => {
        const existingIndex = prev.findIndex(
          (item) => item.icu_chart_order_id === order.icu_chart_order_id,
        )
        if (existingIndex !== -1) {
          return prev.filter((_, index) => index !== existingIndex)
        } else {
          return [...prev, order]
        }
      })
      return
    }

    // 오더 수정하기 위해 다이얼로그 여는 경우
    setOrderStep('edit')
    setSelectedChartOrder(order)
  }

  // -------- 바이탈 참조범위 --------
  const foundVital = vitalRefRange?.find(
    (vital) => vital.order_name === order.icu_chart_order_name,
  )
  const rowVitalRefRange = foundVital
    ? foundVital[species as keyof Omit<VitalRefRange, 'order_name'>]
    : undefined
  // -------- 바이탈 참조범위 --------

  return (
    <TableCell
      className={cn(
        'handle p-0',
        isSorting && isEvenIndex && 'animate-shake-strong',
        isSorting && !isEvenIndex && 'animate-shake-strong-reverse',
      )}
      style={{
        width: orderWidth,
        transition: 'width 0.3s ease-in-out',
      }}
    >
      <Button
        disabled={isOptimisticOrder}
        variant="ghost"
        onClick={isSorting ? undefined : handleClickOrderTitle}
        className={cn(
          'flex h-11 rounded-none px-2 hover:bg-transparent',
          isSorting ? 'cursor-grab' : 'cursor-pointer',
          isOptimisticOrder && 'animate-shake-strong',
          isInOrderPendingQueue && `${MULTISELECT} hover:bg-primary/10`,
        )}
        style={{
          width: orderWidth,
          transition: 'width 0.3s ease-in-out',
        }}
      >
        <OrderTitleContent
          orderType={icu_chart_order_type}
          orderName={icu_chart_order_name}
          orderComment={icu_chart_order_comment}
          treatmentLength={treatments.length}
          orderColorsData={orderColorsData}
          orderFontSizeData={orderFontSizeData}
          vitalRefRange={rowVitalRefRange}
          targetDate={targetDate}
        />
      </Button>
    </TableCell>
  )
}
