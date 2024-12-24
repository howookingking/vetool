import OrderTypeColorDot from '@/components/hospital/common/order-type-color-dot'
import { Button } from '@/components/ui/button'
import { TableCell } from '@/components/ui/table'
import { cn, parsingOrderName, renderOrderSubComment } from '@/lib/utils/utils'
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
  setOrderStep?: (orderStep: 'closed' | 'upsert' | 'selectOrderer') => void
  setIsEditOrderMode?: (isEditOrderMode: boolean) => void
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
  setIsEditOrderMode,
  setSelectedChartOrder,
  isInOrderPendingQueue,
}: OrderRowTitleProps) {
  const { order_comment, order_type, order_name } = order

  const {
    basicHosData: { orderColorsData, orderFontSizeData, orderColorDisplay },
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
      setOrderStep!('upsert')
      setIsEditOrderMode!(true)
      setSelectedChartOrder!(order)
    },
    [
      order,
      setSelectedOrderPendingQueue,
      setSelectedChartOrder,
      setOrderStep,
      setIsEditOrderMode,
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
        onClick={isSorting ? undefined : handleClickOrderTitle}
        className={cn(
          'group flex h-11 justify-between rounded-none bg-transparent px-2 outline-none transition duration-300 hover:scale-[97%] hover:bg-transparent',
          isOptimisticOrder && 'animate-bounce',
          preview
            ? 'cursor-not-allowed'
            : isSorting
              ? 'cursor-grab'
              : 'cursor-pointer',
          isInOrderPendingQueue && 'ring-4 ring-inset ring-primary',
        )}
        style={{
          width: isTouchMove ? 200 : isMobile ? 300 : orderWidth,
          transition: 'width 0.3s ease-in-out, transform 0.3s ease-in-out',
        }}
      >
        <div className="flex items-center gap-2 truncate">
          {/* 오더 색 표시 방법이 dot 인경우 */}
          {orderColorDisplay === 'dot' && (
            <OrderTypeColorDot
              orderColorsData={orderColorsData}
              orderType={order_type}
            />
          )}

          <span style={{ fontSize: `${orderFontSizeData}px` }}>
            {parsingOrderName(order_type, order_name)}
          </span>

          {rowVitalRefRange && (
            <span className="text-xs text-muted-foreground">
              ({rowVitalRefRange.min}~{rowVitalRefRange.max})
            </span>
          )}
        </div>

        {!isTouchMove && (
          <span
            className="min-w-16 truncate text-right text-xs font-semibold text-muted-foreground"
            style={{ fontSize: `${orderFontSizeData - 2}px` }}
          >
            {order_comment}
            {renderOrderSubComment(order)}
          </span>
        )}
      </Button>
    </TableCell>
  )
}
