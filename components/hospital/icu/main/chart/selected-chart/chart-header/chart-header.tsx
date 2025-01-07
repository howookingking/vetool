import HeaderCenter from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-center/header-center'
import HeaderRightButtons from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-right-buttons/header-right-buttons'
import type { SelectedChart } from '@/types/icu/chart'

export default function ChartHeader({
  chartData,
}: {
  chartData: SelectedChart
}) {
  return (
    <header className="relative flex items-center justify-between">
      <HeaderCenter chartData={chartData} />
      <HeaderRightButtons chartData={chartData} />
    </header>
  )
}
