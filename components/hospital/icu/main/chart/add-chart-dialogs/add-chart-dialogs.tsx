import AddDefaultChartDialog from '@/components/hospital/icu/main/chart/add-chart-dialogs/add-default-chart-dialog'
import CopyPrevChartDialog from '@/components/hospital/icu/main/chart/add-chart-dialogs/copy-prev-chart-dialog'
import PasteCopiedChartDialog from '@/components/hospital/icu/main/chart/add-chart-dialogs/paste-copied-chart-dialog'
import AddBookmarkChartDialog from '@/components/hospital/icu/main/chart/add-chart-dialogs/bookmark/add-bookmark-chart-dialog'
import type { SelectedChart } from '@/types/icu/chart'

export default function AddChartDialogs({
  chartData,
  isFirstChart,
}: {
  isFirstChart?: boolean
  chartData?: SelectedChart
}) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5 p-5 ring md:flex-row md:gap-10">
      {isFirstChart ? (
        <AddDefaultChartDialog chartData={chartData} />
      ) : (
        <CopyPrevChartDialog />
      )}

      <PasteCopiedChartDialog />

      <AddBookmarkChartDialog />
    </div>
  )
}
