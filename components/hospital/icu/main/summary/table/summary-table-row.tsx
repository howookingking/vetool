'use client'

import PatientBriefInfo from '@/components/hospital/common/patient/patient-brief-info'
import SummaryTableCell from '@/components/hospital/icu/main/summary/table/summary-table-cell'
import { TableCell, TableRow } from '@/components/ui/table'
import { TIMES } from '@/constants/hospital/icu/chart/time'
import { computeTimeMap } from '@/lib/utils/icu-summary-utils'
import { cn, getDaysDifference } from '@/lib/utils/utils'
import type { Species } from '@/types/hospital/calculator'
import type { SummaryData } from '@/types/icu/summary'
import { SquarePlusIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Props = {
  summary: SummaryData
  targetDate: string
  hosId: string
}

export default function SummaryTableRow({ summary, hosId, targetDate }: Props) {
  const { orders, patient, icu_io } = summary

  const { push } = useRouter()

  const hospitalizationDays = getDaysDifference(summary.icu_io.in_date)
  const isPatientOut = summary.icu_io.out_date !== null

  const timeMap = computeTimeMap(orders)

  return (
    <TableRow
      className={cn(
        'cursor-pointer divide-x',
        isPatientOut && 'text-muted-foreground',
      )}
      onClick={() =>
        push(`/hospital/${hosId}/icu/${targetDate}/chart/${summary.patient_id}`)
      }
    >
      <TableCell className="flex w-[176px] items-center justify-between gap-1">
        <div className="flex flex-1 flex-col items-center gap-1">
          <PatientBriefInfo
            name={patient.name}
            species={patient.species as Species}
            breed={patient.breed}
          />

          {icu_io.cage && (
            <div className="flex items-center justify-center gap-1 text-muted-foreground">
              <SquarePlusIcon size={12} />
              <span className="max-w-[88px] truncate text-xs">
                {icu_io.cage}
              </span>
            </div>
          )}
        </div>

        <span className="shrink-0 text-xs">{hospitalizationDays}일차</span>
      </TableCell>

      {TIMES.map((time) => (
        <SummaryTableCell
          key={time}
          time={time}
          isPatientOut={isPatientOut}
          pendingCount={timeMap[time].pendingCount}
          hasCrucialTx={timeMap[time].hasCrucialTx}
        />
      ))}
    </TableRow>
  )
}
