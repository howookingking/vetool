import ChartBody from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-body'
import ChartHeader from '@/components/hospital/icu/main/chart/selected-chart/chart-header/chart-header'
import OutPatientCover from '@/components/hospital/icu/main/chart/selected-chart/out-patient-cover'
import type { SelectedChart } from '@/types/icu/chart'

export default function Chart({ chartData }: { chartData: SelectedChart }) {
  const isPatientOut = chartData?.icu_io?.out_date !== null

  return (
    <div className="flex h-full flex-col gap-4 overflow-auto px-2 pb-2 pt-0 md:gap-2 2xl:p-2">
      <ChartHeader chartData={chartData} />
      <ChartBody chartData={chartData} />

      {isPatientOut && <OutPatientCover />}
    </div>
  )
}
