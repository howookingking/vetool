import PreviewDialog from '@/components/hospital/common/preview/preview-dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import type { SearchedIcuCharts } from '@/types/icu/search'
import CopyButton from './copy-button'
import GotoButton from './go-to-button'

type Props = {
  chart: SearchedIcuCharts
  index: number
}

export default function IcuChartRow({ chart, index }: Props) {
  return (
    <TableRow key={chart.icu_chart_id}>
      <TableCell className="text-center">{index + 1} 일차</TableCell>

      <TableCell className="text-center">{chart.target_date}</TableCell>

      <TableCell className="text-center">
        <PreviewDialog
          chartId={chart.icu_chart_id}
          isTemplate={false}
          patientId={chart.patient_id!}
          targetDate={chart.target_date!}
        />
      </TableCell>

      <TableCell className="text-center">
        <CopyButton chartId={chart.icu_chart_id} />
      </TableCell>

      <TableCell className="text-center">
        <GotoButton chart={chart} />
      </TableCell>
    </TableRow>
  )
}
