import { Button } from '@/components/ui/button'
import { TableCell } from '@/components/ui/table'
import { toast } from '@/components/ui/use-toast'
import useIsMobile from '@/hooks/use-is-mobile'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { cn, parsingOrderName, renderOrderSubComment } from '@/lib/utils/utils'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import type { IcuOrderColors, VitalRefRange } from '@/types/adimin'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { useCallback, useEffect } from 'react'

export default function CellsRowTitle({
  order,
  isSorting,
  index,
  preview,
  vitalRefRange,
  species,
  orderWidth,
  isTouchMove,
}: {
  order: SelectedIcuOrder
  index: number
  isSorting?: boolean
  preview?: boolean
  vitalRefRange?: VitalRefRange[]
  species?: string
  orderWidth: number
  isTouchMove?: boolean
}) {
  const { order_comment, order_type, order_id, order_name } = order
  const {
    basicHosData: { orderColorsData, orderFontSizeData },
  } = useBasicHosDataContext()
  const {
    setOrderStep,
    setIsEditOrderMode,
    setSelectedChartOrder,
    selectedOrderPendingQueue,
    setSelectedOrderPendingQueue,
    setCopiedOrderPendingQueue,
    reset,
  } = useIcuOrderStore()
  const isMobile = useIsMobile()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const activeElement = document.activeElement
      const isInputFocused =
        activeElement instanceof HTMLInputElement ||
        activeElement instanceof HTMLTextAreaElement ||
        activeElement?.hasAttribute('contenteditable')

      if (
        (event.ctrlKey || event.metaKey) &&
        event.key === 'c' &&
        !isInputFocused
      ) {
        if (selectedOrderPendingQueue.length > 0) {
          setCopiedOrderPendingQueue(selectedOrderPendingQueue)
          setSelectedOrderPendingQueue([])

          toast({
            title: '오더 복사 완료',
            description: '붙여넣기 할 차트로 이동해주세요',
          })
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [
    selectedOrderPendingQueue,
    setCopiedOrderPendingQueue,
    setSelectedOrderPendingQueue,
  ])

  const handleEditOrderDialogOpen = useCallback(
    (e: React.MouseEvent) => {
      if (preview) return

      if (e.metaKey || e.ctrlKey) {
        e.preventDefault()

        setSelectedOrderPendingQueue((prev) => {
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

      reset()
      setOrderStep('upsert')
      setIsEditOrderMode(true)
      setSelectedChartOrder(order)
    },
    [
      preview,
      order,
      setSelectedOrderPendingQueue,
      setSelectedChartOrder,
      setOrderStep,
      setIsEditOrderMode,
      reset,
    ],
  )

  const isInOrderPendingQueue = selectedOrderPendingQueue.some(
    (order) => order.order_id === order_id,
  )

  const isOptimisticOrder = order.order_id.startsWith('temp_order_id')

  // -------- 바이탈 참조범위 --------
  const foundVital = vitalRefRange?.find(
    (vital) => vital.order_name === order.order_name,
  )
  const rowVitalRefRange = foundVital
    ? foundVital[species as keyof Omit<VitalRefRange, 'order_name'>]
    : undefined
  // -------- 바이탈 참조범위 --------

  return (
    <TableCell
      className={cn(
        'handle group p-0',
        isSorting && index % 2 === 0 && 'animate-shake-strong',
        isSorting && index % 2 !== 0 && 'animate-shake-strong-reverse',
        isTouchMove && 'sticky left-0 z-10',
      )}
      style={{
        background: orderColorsData[order_type as keyof IcuOrderColors],
        transition: 'width 0.3s ease-in-out, transform 0.3s ease-in-out',
      }}
    >
      <Button
        disabled={isOptimisticOrder}
        variant="ghost"
        onClick={isSorting ? undefined : handleEditOrderDialogOpen}
        className={cn(
          'group flex h-11 justify-between rounded-none bg-transparent px-2 outline-none ring-inset ring-primary transition duration-300 hover:scale-[97%] hover:bg-transparent',
          isOptimisticOrder && 'animate-bounce',
          preview
            ? 'cursor-not-allowed'
            : isSorting
              ? 'cursor-grab'
              : 'cursor-pointer',
          isInOrderPendingQueue && 'ring-2',
        )}
        style={{
          width: isTouchMove ? 200 : isMobile ? 300 : orderWidth,
          transition: 'width 0.3s ease-in-out, transform 0.3s ease-in-out',
        }}
      >
        <div className="flex items-center gap-1 truncate">
          <span
            className="font-semibold transition group-hover:underline"
            style={{ fontSize: `${orderFontSizeData}px` }}
          >
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
