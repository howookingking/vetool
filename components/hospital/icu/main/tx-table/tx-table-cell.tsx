import CustomTooltip from '@/components/ui/custom-tooltip'
import { TableCell } from '@/components/ui/table'
import useIsMobile from '@/hooks/use-is-mobile'
import { cn, parsingOrderName } from '@/lib/utils/utils'
import type { IcuOrders, IcuTxs } from '@/types'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

type TxTableCellOrder = Pick<
  IcuOrders,
  | 'icu_chart_order_id'
  | 'icu_chart_order_time'
  | 'icu_chart_order_name'
  | 'icu_chart_order_comment'
  | 'icu_chart_order_type'
> & {
  treatments: Pick<IcuTxs, 'time'>[]
}

export default function TxTableCell({
  time,
  order,
  patientId,
  patientName,
}: {
  time: number
  order: TxTableCellOrder
  patientId: string
  patientName: string
}) {
  const { hos_id, target_date } = useParams()
  const { push } = useRouter()
  const searchParams = useSearchParams()
  const isMobile = useIsMobile()

  const isOrderScheduled = useMemo(
    () => order.icu_chart_order_time[time - 1] !== '0',
    [order.icu_chart_order_time, time],
  )

  const isTxCompleted = useMemo(
    () => order.treatments.some((tx) => tx.time === time),
    [order.treatments, time],
  )

  const renderOrderContent = () => {
    if (!isTxCompleted && isOrderScheduled) {
      return (
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
      )
    }
    return null
  }

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

  return (
    <TableCell
      onClick={handleCellClick}
      className={cn(
        'text-center ring-inset ring-primary transition-all',
        isOrderScheduled && 'cursor-pointer hover:ring',
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
