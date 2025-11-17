import HeaderCenter from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-center/header-center'
import HeaderRightButtons from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-right-buttons/header-right-buttons'
import type { SelectedIcuChart } from '@/types/icu/chart'

export default function ChartHeader({
  chartData,
}: {
  chartData: SelectedIcuChart
}) {
  return (
    <div className="fixed z-30 w-full border-b bg-white 2xl:w-exclude-sidebar">
      <HeaderCenter chartData={chartData} />

      <HeaderRightButtons chartData={chartData} />
    </div>
  )
}
