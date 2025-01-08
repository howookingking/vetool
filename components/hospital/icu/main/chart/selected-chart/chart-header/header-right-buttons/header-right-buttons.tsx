import CopyChartButton from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-right-buttons/copy-chart-button'
import DeleteChartDialog from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-right-buttons/delete-chart-dialog'
import ExportDialog from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-right-buttons/export-dialog/export-dialog'
import OutPatientDialog from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-right-buttons/out-patient-dialog'
import type { SelectedChart } from '@/types/icu/chart'

export default function HeaderRightButtons({
  chartData,
}: {
  chartData: SelectedChart
}) {
  const { icu_chart_id, icu_io, patient } = chartData
  return (
    <div className="absolute right-2 top-2 hidden gap-1 2xl:flex">
      <CopyChartButton icuChartId={icu_chart_id} />

      <OutPatientDialog chartData={chartData} />

      <ExportDialog chartData={chartData} />

      <DeleteChartDialog
        icuChartId={icu_chart_id}
        name={patient.name}
        icuIoId={icu_io.icu_io_id}
        inDate={icu_io.in_date}
      />
    </div>
  )
}
