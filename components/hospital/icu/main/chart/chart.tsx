import ChartBody from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-body'
import ChartHeader from '@/components/hospital/icu/main/chart/selected-chart/chart-header/chart-header'
import OutPatientCover from '@/components/hospital/icu/main/chart/selected-chart/out-patient-cover'
import type { SelectedIcuChart } from '@/types/icu/chart'

type Props = {
  selectedIcuChart: SelectedIcuChart
  hosId: string
  targetDate: string
  patientId: string
}

export default function Chart({
  selectedIcuChart,
  hosId,
  targetDate,
  patientId,
}: Props) {
  const isPatientOut = selectedIcuChart?.icu_io?.out_date !== null

  return (
    <div className="relative flex flex-col">
      <ChartHeader
        chartData={selectedIcuChart}
        hosId={hosId}
        targetDate={targetDate}
      />

      <ChartBody
        chartData={selectedIcuChart}
        targetDate={targetDate}
        hosId={hosId}
        patientId={patientId}
      />

      {isPatientOut ? <OutPatientCover /> : null}
    </div>
  )
}
