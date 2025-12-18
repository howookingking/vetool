import HeaderCenter from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-center/header-center'
import HeaderRightButtons from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-right-buttons/header-right-buttons'
import type { SelectedIcuChart } from '@/types/icu/chart'
import PrevIo from './prev-io/prev-io'

type Props = {
  chartData: SelectedIcuChart
  hosId: string
  targetDate: string
}

export default function ChartHeader({ chartData, hosId, targetDate }: Props) {
  return (
    <div className="fixed z-30 w-full border-b bg-white 2xl:w-exclude-sidebar">
      <PrevIo
        patientId={chartData.patient.patient_id}
        hosId={hosId}
        targetDate={targetDate}
      />

      <HeaderCenter chartData={chartData} hosId={hosId} />

      <HeaderRightButtons
        chartData={chartData}
        hosId={hosId}
        targetDate={targetDate}
      />
    </div>
  )
}
