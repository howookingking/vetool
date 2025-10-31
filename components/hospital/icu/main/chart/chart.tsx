import ChartBody from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-body'
import ChartHeader from '@/components/hospital/icu/main/chart/selected-chart/chart-header/chart-header'
import OutPatientCover from '@/components/hospital/icu/main/chart/selected-chart/out-patient-cover'
import type { SelectedIcuChart } from '@/types/icu/chart'

export default function Chart({
  selectedIcuChart,
}: {
  selectedIcuChart: SelectedIcuChart
}) {
  const isPatientOut = selectedIcuChart?.icu_io?.out_date !== null

  return (
    <div className="relative flex flex-col">
      <ChartHeader chartData={selectedIcuChart} />

      <ChartBody chartData={selectedIcuChart} />

      {isPatientOut && <OutPatientCover />}
    </div>
  )
}
