import AddDefaultChartDialog from '@/components/hospital/icu/main/chart/add-chart-dialogs/add-default-chart-dialog'
import AddBookmarkChartDialog from '@/components/hospital/icu/main/chart/add-chart-dialogs/bookmark/add-bookmark-chart-dialog'
import CopyPrevChartDialog from '@/components/hospital/icu/main/chart/add-chart-dialogs/copy-prev-chart-dialog'
import CopyPrevIoChartDialog from '@/components/hospital/icu/main/chart/add-chart-dialogs/copy-prev-io-chart-dialog'
import PasteCopiedChartDialog from '@/components/hospital/icu/main/chart/add-chart-dialogs/paste-copied-chart-dialog'
import type { PrevIoChartData, SelectedChart } from '@/types/icu/chart'

export default function AddChartDialogs({
  chartData,
  isFirstChart,
  prevIoChartData,
}: {
  isFirstChart?: boolean
  chartData?: SelectedChart
  prevIoChartData?: PrevIoChartData | null
}) {
  if (isFirstChart && prevIoChartData) {
    return (
      <div className="flex h-full w-full items-center justify-center gap-5 p-5 ring md:gap-10">
        <div className="flex h-full w-full flex-col items-end justify-center gap-5 md:gap-10">
          <AddDefaultChartDialog chartData={chartData} />
          <PasteCopiedChartDialog />
        </div>

        <div className="flex h-full w-full flex-col justify-center gap-5 md:gap-10">
          <CopyPrevIoChartDialog prevIoChartData={prevIoChartData} />
          <AddBookmarkChartDialog />
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5 px-5 py-5 ring md:flex-row md:gap-10 lg:px-32">
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
