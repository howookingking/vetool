import PreviewButton from '@/components/hospital/icu/common-dialogs/preview/preview-button'
import { TableCell, TableRow } from '@/components/ui/table'
import type { SearchedIcuCharts } from '@/types/icu/search'
import CopyButton from './copy-button'
import GotoButton from './go-to-button'
export default function IcuChartRow({
  chart,
  index,
}: {
  chart: SearchedIcuCharts
  index: number
}) {
  return (
    <TableRow key={chart.icu_chart_id}>
      <TableCell className="text-center">{index + 1} 일차</TableCell>
      <TableCell className="text-center">{chart.target_date}</TableCell>
      <TableCell className="text-center">
        <PreviewButton
          patientId={chart.patient_id!}
          targetDate={chart.target_date}
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
