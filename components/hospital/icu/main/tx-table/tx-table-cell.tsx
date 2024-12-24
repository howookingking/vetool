import { Button } from '@/components/ui/button'
import { TableCell } from '@/components/ui/table'
import useIsMobile from '@/hooks/use-is-mobile'
import { OrderTimePendingQueue } from '@/lib/store/icu/icu-order'
import { TxLocalState } from '@/lib/store/icu/tx-mutation'
import { cn, parsingOrderName } from '@/lib/utils/utils'
import { TxLog } from '@/types/icu/chart'
import { IcuTxTableData } from '@/types/icu/tx-table'
import { ArrowRight, Edit } from 'lucide-react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export default function TxTableCell({
  time,
  order,
  patientId,
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
  setTxStep: (txStep: 'closed' | 'detailInsert' | 'selectUser') => void
}) {
  const { hos_id, target_date } = useParams()
  const { push } = useRouter()

  const searchParams = useSearchParams()
  const isMobile = useIsMobile()
  const isOrderScheduled = order.icu_chart_order_time[time - 1] !== '0'
  const isTxCompleted = order.treatments.some(
    (tx) => tx.time === time && tx.tx_result,
  )
  const treatment = order.treatments.reverse().find((tx) => tx.time === time)
  const hasCrucialTx = order.treatments.some(
    (tx) => tx.time === time && tx.is_crucial,
  )

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

  const handleClickMove = () => {
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

  const notCompletedTx = !isTxCompleted && isOrderScheduled

  return (
    <TableCell className="relative text-center ring-inset ring-primary transition-all">
      {notCompletedTx ? (
        <>
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

            <div className="flex justify-center gap-1.5">
              <Button
                variant="outline"
                className="h-6 w-6 p-4"
                size="icon"
                title="처치입력"
                onClick={handleOpenTxDetail}
              >
                <Edit />
              </Button>
              <Button
                variant="outline"
                className="h-6 w-6 p-4"
                size="icon"
                title="이동"
                onClick={handleClickMove}
              >
                <ArrowRight />
              </Button>
            </div>
          </div>
        </>
      ) : null}

      {hasCrucialTx && <span className="absolute bottom-0 left-0">❗️</span>}
    </TableCell>
  )
}
