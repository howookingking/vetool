'use client'

import PatientInfo from '@/components/hospital/common/patient-info'
import SummaryTableCell from '@/components/hospital/icu/main/summary/table/summary-table-cell'
import { TableCell, TableRow } from '@/components/ui/table'
import { TIMES } from '@/constants/hospital/icu/chart/time'
import { cn, getDaysDifference } from '@/lib/utils/utils'
import type { SummaryData } from '@/types/icu/summary'
import { SquarePlus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

export default function SummaryTableRow({ summary }: { summary: SummaryData }) {
  const { push } = useRouter()
  const { hos_id, target_date } = useParams()
  const { orders, patient, icu_io } = summary

  const hospitalizationDays = getDaysDifference(summary.icu_io.in_date)
  const isPatientOut = summary.icu_io.out_date !== null

  const handleClickRow = (patientId: string) => {
    push(`/hospital/${hos_id}/icu/${target_date}/chart/${patientId}`)
  }

  return (
    <TableRow
      className={cn(
        'cursor-pointer divide-x',
        isPatientOut && 'text-muted-foreground line-through',
      )}
      onClick={() => handleClickRow(summary.patient_id as string)}
    >
      <TableCell className="flex w-[176px] items-center justify-between gap-1">
        <div className="flex flex-1 flex-col items-center gap-1">
          <PatientInfo
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
      {TIMES.map((time) => (
        <SummaryTableCell
          key={time}
          time={time}
          orders={orders}
          isPatientOut={isPatientOut}
        />
      ))}
    </TableRow>
  )
}
