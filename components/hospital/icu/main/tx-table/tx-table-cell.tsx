import { Button } from '@/components/ui/button'
import CustomTooltip from '@/components/ui/custom-tooltip'
import { TableCell } from '@/components/ui/table'
import useIsMobile from '@/hooks/use-is-mobile'
import { OrderTimePendingQueue } from '@/lib/store/icu/icu-order'
import { TxLocalState } from '@/lib/store/icu/tx-mutation'
import { cn, parsingOrderName } from '@/lib/utils/utils'
import { TxLog } from '@/types/icu/chart'
import { IcuTxTableData } from '@/types/icu/tx-table'
import { ArrowRight, ClipboardCheck } from 'lucide-react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export default function TxTableCell({
  time,
  order,
  patientId,
  patientName,
  orderTimePendingQueueLength,
  setSelectedTxPendingQueue,
  setTxLocalState,
  setTxStep,
}: {
  time: number
  order: IcuTxTableData['orders'][number]
  patientId: string
  patientName: string
  orderTimePendingQueueLength: number
  setSelectedTxPendingQueue: (
    updater:
      | OrderTimePendingQueue[]
      | ((prev: OrderTimePendingQueue[]) => OrderTimePendingQueue[]),
  ) => void
  setTxLocalState: (updates: Partial<TxLocalState>) => void
  setTxStep: (txStep: 'closed' | 'detailInsert' | 'seletctUser') => void
}) {
  const { hos_id, target_date } = useParams()
  const { push } = useRouter()

  const searchParams = useSearchParams()
  const isMobile = useIsMobile()
  const isOrderScheduled = order.icu_chart_order_time[time - 1] !== '0'
  const isTxCompleted = order.treatments.some((tx) => tx.time === time)
  const treatment = order.treatments.reverse().find((tx) => tx.time === time)

  const handleOpenTxDetail = useCallback(() => {
    setTxLocalState({
      icuChartOrderId: order.icu_chart_order_id,
      icuChartOrderType: order.icu_chart_order_type,
      icuChartOrderName: order.icu_chart_order_name,
      txResult: treatment?.tx_result,
      txComment: treatment?.tx_comment,
      txId: treatment?.tx_id,
      time,
      txLog: treatment?.tx_log as TxLog[] | null,
      isCrucialChecked: treatment?.is_crucial,
    })
    setTxStep('detailInsert')
  }, [
    order.icu_chart_order_id,
    treatment?.tx_id,
    setTxStep,
    setTxLocalState,
    time,
    treatment?.tx_comment,
    treatment?.tx_log,
    treatment?.tx_result,
    order.icu_chart_order_type,
    order.icu_chart_order_name,
    treatment?.is_crucial,
  ])

  const handleCellClick = () => {
    if (!isOrderScheduled) return

    const params = new URLSearchParams(searchParams)
    if (isMobile) {
      push(`/hospital/${hos_id}/icu/${target_date}/chart/${patientId}`)
    } else {
      push(
        `/hospital/${hos_id}/icu/${target_date}/chart/${patientId}?order-id=${order.icu_chart_order_id}&time=${time}&${params}`,
      )
    }
  }

  const renderOrderContent = () => {
    if (!isTxCompleted && isOrderScheduled) {
      return (
        <div className="flex flex-col">
          <div className="flex flex-col whitespace-nowrap py-4">
            <span className="text-sm">
              {parsingOrderName(
                order.icu_chart_order_type,
                order.icu_chart_order_name,
              )}
            </span>
            <span className="text-xs text-muted-foreground">
              {order.icu_chart_order_comment}
              {order.icu_chart_order_type === 'fluid' && 'ml/hr'}
            </span>
          </div>
          <div className="mt-auto flex justify-between gap-2">
            <Button
              variant="ghost"
              className="h-6 w-6 p-4"
              size="icon"
              title="처치"
              onClick={handleOpenTxDetail}
            >
              <ClipboardCheck />
            </Button>
            <Button
              variant="ghost"
              className="h-6 w-6 p-4"
              size="icon"
              title="이동"
              onClick={handleCellClick}
            >
              <ArrowRight />
            </Button>
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <TableCell
      className={cn(
        'text-center ring-inset ring-primary transition-all',
        isOrderScheduled && !isTxCompleted && 'cursor-pointer hover:ring',
      )}
    >
      <CustomTooltip
        contents={
          <>
            {patientName} / {time}
          </>
        }
      >
        {renderOrderContent()}
      </CustomTooltip>
    </TableCell>
  )
}
