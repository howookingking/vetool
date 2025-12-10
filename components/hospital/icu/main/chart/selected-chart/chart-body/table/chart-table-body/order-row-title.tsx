import OrderTitleContent from '@/components/hospital/common/order/order-title-content'
import { Button } from '@/components/ui/button'
import { TableCell } from '@/components/ui/table'
import type { OrderStep } from '@/lib/store/icu/icu-order'
import { cn } from '@/lib/utils/utils'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import type { VitalRefRange } from '@/types/adimin'
import type { SelectedIcuOrder } from '@/types/icu/chart'

type Props = {
  order: SelectedIcuOrder
  index: number
  isSorting?: boolean
  vitalRefRange?: VitalRefRange[]
  species: string
  orderWidth: number
  resetOrderStore?: () => void
  setSelectedOrderPendingQueue?: (
    updater:
      | Partial<SelectedIcuOrder>[]
      | ((prev: Partial<SelectedIcuOrder>[]) => Partial<SelectedIcuOrder>[]),
  ) => void
  setOrderStep?: (orderStep: OrderStep) => void
  setSelectedChartOrder?: (chartOrder: Partial<SelectedIcuOrder>) => void
  isInOrderPendingQueue?: boolean
}

export default function OrderRowTitle({
  order,
  isSorting,
  index,
  vitalRefRange,
  species,
  orderWidth,
  resetOrderStore,
  setSelectedOrderPendingQueue,
  setOrderStep,
  setSelectedChartOrder,
  isInOrderPendingQueue,
}: Props) {
  const {
    icu_chart_order_comment,
    icu_chart_order_type,
    icu_chart_order_name,
  } = order

  // sorting 때문에 상위에 있으면 안되고 여기 있어야함
  const {
    basicHosData: { orderColorsData, orderFontSizeData },
  } = useBasicHosDataContext()

  const handleClickOrderTitle = (e: React.MouseEvent) => {
    // 오더 다중 선택시
    if (e.metaKey || e.ctrlKey) {
      e.preventDefault()
      setSelectedOrderPendingQueue!((prev) => {
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
    resetOrderStore!()
    setOrderStep!('edit')
    setSelectedChartOrder!(order)
  }

  // -------- 바이탈 참조범위 --------
  const foundVital = vitalRefRange?.find(
    (vital) => vital.order_name === order.icu_chart_order_name,
  )
  const rowVitalRefRange = foundVital
    ? foundVital[species as keyof Omit<VitalRefRange, 'order_name'>]
    : undefined
  // -------- 바이탈 참조범위 --------

  const isOptimisticOrder = order.icu_chart_order_id.startsWith('temp_order_id')

  return (
    <TableCell
      className={cn(
        'handle group p-0',
        isSorting && index % 2 === 0 && 'animate-shake-strong',
        isSorting && index % 2 !== 0 && 'animate-shake-strong-reverse',
      )}
      style={{
        width: orderWidth,
        transition: 'width 0.3s ease-in-out, transform 0.3s ease-in-out',
      }}
    >
      <Button
        disabled={isOptimisticOrder}
        variant="ghost"
        onClick={isSorting ? undefined : handleClickOrderTitle}
        className={cn(
          'group flex h-11 justify-between rounded-none bg-transparent px-2 outline-none transition duration-300 hover:scale-[97%] hover:bg-transparent',
          isOptimisticOrder && 'animate-bounce',
          isSorting ? 'cursor-grab' : 'cursor-pointer',
          isInOrderPendingQueue && 'ring-2 ring-inset ring-primary',
        )}
        style={{
          width: orderWidth,
          transition: 'width 0.3s ease-in-out, transform 0.3s ease-in-out',
        }}
      >
        <OrderTitleContent
          orderType={order.icu_chart_order_type}
          orderName={order.icu_chart_order_name}
          orderComment={order.icu_chart_order_comment}
          orderColorsData={orderColorsData}
          orderFontSizeData={orderFontSizeData}
          vitalRefRange={rowVitalRefRange}
        />
      </Button>
    </TableCell>
  )
}
