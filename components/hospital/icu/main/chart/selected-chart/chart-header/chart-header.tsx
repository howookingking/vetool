'use client'

import HeaderCenter from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-center/bookmark-and-signalments'
import HeaderRightButtons from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-right-buttons/header-right-buttons'
import type { SelectedChart } from '@/types/icu/chart'

export default function ChartHeader({
  chartData,
}: {
  chartData: SelectedChart
}) {
  return (
    <header className="left-0 top-0 z-20 w-full md:fixed">
      <HeaderCenter chartData={chartData} />

      <HeaderRightButtons chartData={chartData} />
    </header>
  )
}
