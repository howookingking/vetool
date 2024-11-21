import ChartInfos from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/chart-infos'
import ChartMemos from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-memos/chart-memos'
import ChartTable from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table'
import type { SelectedChart } from '@/types/icu/chart'

export default function ChartBody({ chartData }: { chartData: SelectedChart }) {
  const { memo_a, memo_b, memo_c, icu_chart_id } = chartData

  return (
    <div className="flex flex-col gap-2">
      <ChartInfos chartData={chartData} />

      <ChartTable chartData={chartData} />

      <ChartMemos
        memoA={memo_a}
        memoB={memo_b}
        memoC={memo_c}
        icuChartId={icu_chart_id}
      />
    </div>
  )
}
