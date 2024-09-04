import { useIsChartLoadingStore } from '@/lib/store/icu/is-chart-loading'
import { IcuChartJoined } from '@/types/icu'
import { useParams } from 'next/navigation'
import AddDefaultChartDialog from './add-default-chart-dialog'
import AddBookmarkChartDialog from './bookmark/add-bookmark-chart-dialog'
import CopyPrevChartDialog from './copy-prev-chart-dialog'
import PasteCopiedChartDialog from './paste-copied-chart-dialog'
import type { IcuOrderTypeColor } from '@/types/adimin'

export default function AddChartDialogs({
  selectedPatientId,
  selectedChart,
  isFirstChart,
  orderColors,
}: {
  selectedPatientId: string
  selectedChart?: IcuChartJoined
  isFirstChart: boolean
  orderColors: IcuOrderTypeColor
}) {
  const { target_date } = useParams()
  const { setIsChartLoading } = useIsChartLoadingStore()

  return (
    <div className="flex h-icu-chart w-full items-center justify-center gap-10 p-10">
      {!isFirstChart && (
        <CopyPrevChartDialog
          targetDate={target_date as string}
          selectedPatientId={selectedPatientId}
          setIsCreatingChart={setIsChartLoading}
        />
      )}

      {isFirstChart && (
        <AddDefaultChartDialog
          selectedChart={selectedChart}
          setIsCreatingChart={setIsChartLoading}
        />
      )}

      <PasteCopiedChartDialog
        targetDate={target_date as string}
        selectedPatientId={selectedPatientId}
        setIsCreatingChart={setIsChartLoading}
      />
      <AddBookmarkChartDialog orderColors={orderColors} />
    </div>
  )
}
