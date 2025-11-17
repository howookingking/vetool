import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { SelectedIcuChart } from '@/types/icu/chart'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import ChartTable from '../../icu/main/chart/selected-chart/chart-body/table/chart-table'

export default function PreviewDialogContent({
  copiedChart,
}: {
  copiedChart: SelectedIcuChart
}) {
  return (
    <DialogContent className="sm:min-w-[1600px]">
      <DialogHeader>
        <DialogTitle>미리보기</DialogTitle>
        <VisuallyHidden>
          <DialogDescription />
        </VisuallyHidden>
      </DialogHeader>

      <div className="max-h-[800px] overflow-y-auto">
        <ChartTable preview chartData={copiedChart!} />
      </div>
    </DialogContent>
  )
}
