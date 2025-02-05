import OrderTitleContent from '@/components/hospital/common/order/order-title-content'
import { Button } from '@/components/ui/button'
import { TableCell } from '@/components/ui/table'
import { OrderStep } from '@/lib/store/icu/icu-order'
import { cn } from '@/lib/utils/utils'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import type { IcuOrderColors, VitalRefRange } from '@/types/adimin'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { useCallback } from 'react'

type OrderRowTitleProps = {
  order: SelectedIcuOrder
  index: number
  isMobile: boolean
  isSorting?: boolean
  preview?: boolean
  vitalRefRange?: VitalRefRange[]
  species: string
  orderWidth: number
  isTouchMove?: boolean
  reset?: () => void
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
  isMobile,
  preview,
  vitalRefRange,
  species,
  orderWidth,
  isTouchMove,
  reset,
  setSelectedOrderPendingQueue,
  setOrderStep,
  setSelectedChartOrder,
  isInOrderPendingQueue,
}: OrderRowTitleProps) {
  const { order_comment, order_type, order_name } = order

  const {
    basicHosData: { orderColorsData, orderColorDisplay, orderFontSizeData },
  } = useBasicHosDataContext()

  const handleClickOrderTitle = useCallback(
    (e: React.MouseEvent) => {
      // 오더 다중 선택시
      if (e.metaKey || e.ctrlKey) {
        e.preventDefault()
        setSelectedOrderPendingQueue!((prev) => {
          const existingIndex = prev.findIndex(
            (item) => item.order_id === order.order_id,
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
      reset!()
      setOrderStep!('edit')
      setSelectedChartOrder!(order)
    },
    [
      order,
      setSelectedOrderPendingQueue,
      setSelectedChartOrder,
      setOrderStep,
      reset,
    ],
  )

  // -------- 바이탈 참조범위 --------
  const foundVital = vitalRefRange?.find(
    (vital) => vital.order_name === order.order_name,
  )
  const rowVitalRefRange = foundVital
    ? foundVital[species as keyof Omit<VitalRefRange, 'order_name'>]
    : undefined
  // -------- 바이탈 참조범위 --------

  const isOptimisticOrder = order.order_id.startsWith('temp_order_id')

  return (
    <TableCell
      className={cn(
        'handle group p-0',
        isSorting && index % 2 === 0 && 'animate-shake-strong',
        isSorting && index % 2 !== 0 && 'animate-shake-strong-reverse',
        isTouchMove && 'sticky left-0 z-10',
      )}
      style={{
        width: orderWidth,
        transition: 'width 0.3s ease-in-out, transform 0.3s ease-in-out',

        // 오더 색 표시 방법이 full 인경우
        background:
          orderColorDisplay === 'full'
            ? orderColorsData[order_type as keyof IcuOrderColors]
            : 'transparent',
      }}
    >
      <Button
        disabled={isOptimisticOrder}
        variant="ghost"
        onClick={isSorting || preview ? undefined : handleClickOrderTitle}
        className={cn(
          'group flex h-11 justify-between rounded-none bg-transparent px-2 outline-none transition duration-300 hover:scale-[97%] hover:bg-transparent',
          isOptimisticOrder && 'animate-bounce',
          preview
            ? 'cursor-not-allowed'
            : isSorting
              ? 'cursor-grab'
              : 'cursor-pointer',
          isInOrderPendingQueue && 'ring-2 ring-inset ring-primary',
        )}
        style={{
          width: isTouchMove ? 200 : isMobile ? 300 : orderWidth,
          transition: 'width 0.3s ease-in-out, transform 0.3s ease-in-out',
        }}
      >
        <OrderTitleContent
          orderType={order_type}
          orderName={order_name}
          orderComment={order_comment}
          orderColorDisplay={orderColorDisplay}
          orderColorsData={orderColorsData}
          orderFontSizeData={orderFontSizeData}
          vitalRefRange={rowVitalRefRange}
          isTouchMove={isTouchMove}
        />
      </Button>
    </TableCell>
  )
}
