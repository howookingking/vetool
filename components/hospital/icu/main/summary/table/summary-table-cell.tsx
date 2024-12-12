import { TableCell } from '@/components/ui/table'
import { CELL_COLORS } from '@/constants/hospital/icu/chart/colors'
import type { SummaryOrder } from '@/types/icu/summary'

const countPendingOrders = (orders: SummaryOrder[], time: number): number =>
  orders.filter((order) => {
    const orderTime = order.order_times[time - 1]
    const hasTx = order.treatments.some((tx) => tx.time === time)
    return orderTime !== '0' && !hasTx
  }).length

const findhasCrucialTx = (orders: SummaryOrder[], time: number): boolean =>
  orders.some((order) => {
    const hasTx = order.treatments.some(
      (tx) => tx.time === time && tx.is_crucial,
    )

    return hasTx
  })

export default function SummaryTableCell({
  time,
  orders,
  isPatientOut,
}: {
  time: number
  orders: SummaryOrder[]
  isPatientOut: boolean
}) {
  const pendingCount = countPendingOrders(orders, time)
  const hasCrucialTx = findhasCrucialTx(orders, time)

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
