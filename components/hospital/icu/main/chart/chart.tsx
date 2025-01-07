import ChartBody from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-body'
import ChartHeader from '@/components/hospital/icu/main/chart/selected-chart/chart-header/chart-header'
import OutPatientCover from '@/components/hospital/icu/main/chart/selected-chart/out-patient-cover'
import type { SelectedChart } from '@/types/icu/chart'

export default function Chart({ chartData }: { chartData: SelectedChart }) {
  const isPatientOut = chartData?.icu_io?.out_date !== null

  return (
    <div className="flex h-desktop flex-col overflow-auto">
      <ChartHeader chartData={chartData} />
      <ChartBody chartData={chartData} />

      {isPatientOut && <OutPatientCover />}
    </div>
  )
}
