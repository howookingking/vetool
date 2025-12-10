import { Input } from '@/components/ui/input'
import { TableCell } from '@/components/ui/table'
import { cn } from '@/lib/utils/utils'

type Props = {
  time: number
  icuChartOrderId: string
  orderer: string
  toggleOrderTime: (orderId: string, time: number) => void
  isGuidelineTime: boolean
  hasOrder: boolean
  isInOrderTimePendingQueue: boolean
}

export default function DtCell({
  time,
  icuChartOrderId,
  orderer,
  toggleOrderTime,
  isGuidelineTime,
  hasOrder,
  isInOrderTimePendingQueue,
}: Props) {
  const handleRightClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.metaKey || e.ctrlKey) {
      e.currentTarget.blur()
      toggleOrderTime(icuChartOrderId, time)
    }
  }

  const canceledOrderTime = hasOrder && isInOrderTimePendingQueue

  return (
    <TableCell className="handle group p-0">
      <div
        className={cn(
          'relative [&:focus-within_.tx-result-overlay]:overflow-visible',
        )}
      >
        <Input
          readOnly
          className={cn(
            isGuidelineTime && 'bg-amber-300/10',
            hasOrder && 'bg-rose-400/10',
            canceledOrderTime && 'bg-transparent',
            !hasOrder && isInOrderTimePendingQueue && 'bg-rose-400/10',
            'h-11 min-w-12 rounded-none border-none px-1 text-center ring-inset focus-visible:ring-2 md:min-w-0',
          )}
          onContextMenu={handleRightClick}
          aria-label="처치 결과 입력"
        />

        {orderer !== '0' && (
          <div
            className={cn(
              canceledOrderTime
                ? 'hidden'
                : 'pointer-events-none absolute bottom-0.5 right-0.5 text-[10px] leading-none text-muted-foreground',
            )}
          >
            {orderer}
          </div>
        )}
      </div>
    </TableCell>
  )
}
