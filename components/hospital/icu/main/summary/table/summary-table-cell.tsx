import { TableCell } from '@/components/ui/table'
import { CELL_COLORS } from '@/constants/hospital/icu/chart/colors'
import type { SummaryOrder } from '@/types/icu/summary'

type SummaryTableCellProps = {
  time: number
  orders: SummaryOrder[]
  isPatientOut: boolean
}

export default function SummaryTableCell({
  time,
  orders,
  isPatientOut,
}: SummaryTableCellProps) {
  const pendingCount = orders.filter((order) => {
    const wasOrderedForThisTime = order.order_times[time - 1] !== '0'

    const hasCompletedTreatments = order.treatments
      .filter((treatment) => treatment.time === time)
      .some((treatment) => treatment.icu_chart_tx_result)

    return wasOrderedForThisTime && !hasCompletedTreatments
  }).length

  const hasCrucialTx = orders.some((order) => {
    const hasTx = order.treatments.some(
      (tx) => tx.time === time && tx.is_crucial,
    )
    return hasTx
  })

  return (
    <TableCell
      className="relative text-center"
      style={{
        backgroundColor:
          pendingCount > 0
            ? isPatientOut
              ? CELL_COLORS.OUT
              : CELL_COLORS.NOT_DONE
            : CELL_COLORS.DONE,
      }}
    >
      {pendingCount}

      {hasCrucialTx && (
        <span className="absolute bottom-0 left-0 text-[10px]">❗️</span>
      )}
    </TableCell>
  )
}
