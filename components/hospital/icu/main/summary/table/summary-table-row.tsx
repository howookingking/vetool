'use client'

import PatientBriefInfo from '@/components/hospital/common/patient/patient-brief-info'
import SummaryTableCell from '@/components/hospital/icu/main/summary/table/summary-table-cell'
import { TableCell, TableRow } from '@/components/ui/table'
import { TIMES } from '@/constants/hospital/icu/chart/time'
import { cn, getDaysDifference } from '@/lib/utils/utils'
import type { SummaryData } from '@/types/icu/summary'
import { SquarePlus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

export default function SummaryTableRow({ summary }: { summary: SummaryData }) {
  const { orders, patient, icu_io } = summary

  const { push } = useRouter()
  const { hos_id, target_date } = useParams()

  const hospitalizationDays = getDaysDifference(summary.icu_io.in_date)
  const isPatientOut = summary.icu_io.out_date !== null

  const timeMap: Record<
    number,
    {
      hasCrucial: boolean
      pendingCount: number
    }
  > = {}
  for (const time of TIMES) {
    timeMap[time] = { hasCrucial: false, pendingCount: 0 }
  }
  for (const order of orders) {
    for (const time of TIMES) {
      const hasOrder = order.order_times[time] !== '0'
      if (!hasOrder) continue // 빈 오더는 스킵

      const treatmentsAtTime = order.treatments.filter((t) => t.time === time)
      const hasCompleted = treatmentsAtTime.some((t) => t.icu_chart_tx_result)
      const hasCrucial = treatmentsAtTime.some((t) => t.is_crucial)

      if (hasOrder && !hasCompleted) timeMap[time].pendingCount++
      if (hasCrucial) timeMap[time].hasCrucial = true
    }
  }

  return (
    <TableRow
      className={cn(
        'cursor-pointer divide-x',
        isPatientOut && 'text-muted-foreground line-through',
      )}
      onClick={() =>
        push(
          `/hospital/${hos_id}/icu/${target_date}/chart/${summary.patient_id}`,
        )
      }
    >
      <TableCell className="flex w-[176px] items-center justify-between gap-1">
        <div className="flex flex-1 flex-col items-center gap-1">
          <PatientBriefInfo
            name={patient.name}
            species={patient.species}
            breed={patient.breed}
            iconSize={18}
            col
          />

          {icu_io.cage && (
            <div className="flex items-center justify-center gap-1 text-muted-foreground">
              <SquarePlus size={12} />
              <span className="max-w-[88px] truncate text-xs">
                {icu_io.cage}
              </span>
            </div>
          )}
        </div>

        <span className="shrink-0 text-xs">{hospitalizationDays}일차</span>
      </TableCell>

      {TIMES.map((time) => {
        return (
          <SummaryTableCell
            key={time}
            time={time}
            isPatientOut={isPatientOut}
            pendingCount={timeMap[time].pendingCount}
            hasCrucialTx={timeMap[time].hasCrucial}
          />
        )
      })}
    </TableRow>
  )
}
