import { TIMES } from '@/constants/hospital/icu/chart/time'
import { Treatment } from '@/types/icu/chart'
import { TableCell } from '@/components/ui/table'
import { TxDetailHover } from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/tx/tx-detail-hover'

export default function ReadOnlyChartCells({
  treatments,
  orderTimes,
}: {
  treatments: Treatment[]
  orderTimes: string[]
}) {
  return (
    <>
      {TIMES.map((time) => {
        const orderer = orderTimes[time - 1]
        const hasOrder = orderer !== '0'
        const tx = treatments.findLast((treatment) => treatment.time === time)
        const hasComment = !!tx?.tx_comment

        return (
          <TableCell key={time} className="group relative text-center">
            <div className="[&:focus-within_.tx-result-overlay]:overflow-visible [&:focus-within_.tx-result-overlay]:opacity-50">
              <span className="tx-result-overlay absolute inset-0 -z-10 flex items-center justify-center overflow-hidden whitespace-pre group-hover:overflow-visible">
                {tx?.tx_result}
              </span>

              {hasComment && <TxDetailHover txComment={tx.tx_comment} />}
            </div>
          </TableCell>
        )
      })}
    </>
  )
}
