import PreviewDialog from '@/components/hospital/common/preview/preview-dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import type { ChartByIo } from '@/lib/services/icu/chart/get-icu-chart'
import type { Dispatch, SetStateAction } from 'react'
import ConfirmPastePastChartDialog from './confirm-past-past-chart-dialog'

type Props = {
  patientId: string
  targetDate: string
  chart: ChartByIo
  index: number
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}

export default function ChartByIoRow({
  patientId,
  chart,
  index,
  setIsDialogOpen,
  targetDate,
}: Props) {
  return (
    <TableRow key={chart.icu_chart_id}>
      <TableCell className="w-1/4 py-0.5 text-center">{index} 일차</TableCell>

      <TableCell className="w-1/4 py-0.5 text-center">
        {chart.target_date}
      </TableCell>

      <TableCell className="w-1/4 py-0.5 text-center">
        <PreviewDialog
          chartId={chart.icu_chart_id}
          isTemplate={false}
          patientId={chart.patient_id!}
          targetDate={chart.target_date!}
        />
      </TableCell>

      <TableCell className="w-1/4 py-0.5 text-center">
        <ConfirmPastePastChartDialog
          patientId={patientId}
          targetDate={targetDate}
          chartId={chart.icu_chart_id}
          setIsDialogOpen={setIsDialogOpen}
        />
      </TableCell>
    </TableRow>
  )
}
