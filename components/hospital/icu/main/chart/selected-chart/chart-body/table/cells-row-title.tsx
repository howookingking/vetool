import { Button } from '@/components/ui/button'
import { TableCell } from '@/components/ui/table'
import { toast } from '@/components/ui/use-toast'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { cn, parsingOrderName } from '@/lib/utils/utils'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import type { IcuOrderColors, VitalRefRange } from '@/types/adimin'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { useCallback, useEffect, useMemo } from 'react'

export default function CellsRowTitle({
  order,
  isSorting,
  index,
  preview,
  vitalRefRange,
  species,
}: {
  order: SelectedIcuOrder
  index: number
  isSorting?: boolean
  preview?: boolean
  vitalRefRange?: VitalRefRange[]
  species?: string
}) {
  const { order_comment, order_type, order_id } = order
  const {
    basicHosData: { orderColorsData },
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

  const isInPendingQueue = useMemo(() => {
    return selectedOrderPendingQueue.some(
      (order) => order.order_id === order_id,
    )
  }, [order_id, selectedOrderPendingQueue])

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

  const isOptimisticOrder = useMemo(() => {
    return order.order_id.startsWith('temp_order_id')
  }, [order])

  // 바이탈 참조범위
  const rowVitalRefRange = useMemo(() => {
    const foundVital = vitalRefRange?.find(
      (vital) => vital.order_name === order.order_name,
    )
    return foundVital
      ? foundVital[species as keyof Omit<VitalRefRange, 'order_name'>]
      : undefined
  }, [species, order.order_name, vitalRefRange])

  return (
    <TableCell
      className={cn(
        'handle group w-[320px] p-0',
        isSorting && index % 2 === 0 && 'animate-shake-strong',
        isSorting && index % 2 !== 0 && 'animate-shake-strong-reverse',
      )}
      style={{
        background: orderColorsData[order_type as keyof IcuOrderColors],
      }}
    >
      <Button
        disabled={isOptimisticOrder}
        variant="ghost"
        onClick={isSorting ? undefined : handleEditOrderDialogOpen}
        className={cn(
          'flex h-11 w-[320px] justify-between rounded-none bg-transparent px-2 outline-none ring-inset ring-primary',
          isOptimisticOrder && 'animate-shake-strong',
          preview
            ? 'cursor-not-allowed'
            : isSorting
              ? 'cursor-grab'
              : 'cursor-pointer',
          isInPendingQueue && 'ring-2',
        )}
      >
        <div className="flex items-center gap-1 truncate">
          <span className="font-semibold">
            {parsingOrderName(order_type, order.order_name)}
          </span>

          {rowVitalRefRange && (
            <span className="text-xs text-muted-foreground">
              ({rowVitalRefRange.min}~{rowVitalRefRange.max})
            </span>
          )}
        </div>

        <span className="min-w-16 truncate text-right text-xs text-muted-foreground">
          {order_comment} {order_type === 'fluid' && 'ml/hr'}
        </span>
      </Button>
    </TableCell>
  )
}
