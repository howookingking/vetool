'use client'

import ChartInfos from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/chart-infos'
import ChartMemos from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-memos/chart-memos'
import ChartTable from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table'
import MobileChartTable from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/mobile/mobile-chart-table'
import useIsMobile from '@/hooks/use-is-mobile'
import { type Memo, type SelectedChart } from '@/types/icu/chart'

export default function ChartBody({ chartData }: { chartData: SelectedChart }) {
  const {
    icu_io: { memo_a, memo_b, memo_c, icu_io_id },
  } = chartData
  const isMobile = useIsMobile()

  return (
    <div className="mt-12 flex flex-col gap-2 p-2">
      <ChartInfos chartData={chartData} />

      {isMobile ? (
        <MobileChartTable chartData={chartData} />
      ) : (
        <ChartTable chartData={chartData} />
      )}
      <ChartMemos
        memoA={memo_a as Memo[] | null}
        memoB={memo_b as Memo[] | null}
        memoC={memo_c as Memo[] | null}
        icuIoId={icu_io_id}
      />
    </div>
  )
}
