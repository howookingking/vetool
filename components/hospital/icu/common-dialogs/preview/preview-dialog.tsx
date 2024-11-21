import ReadOnlyChartTable from '@/components/hospital/icu/common-dialogs/preview/read-only-chart-table'
import ChartTable from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useCopiedChartStore } from '@/lib/store/icu/copied-chart'
import { usePreviewDialogStore } from '@/lib/store/icu/preview-dialog'
import { DialogDescription } from '@radix-ui/react-dialog'

export default function PreviewDialog() {
  const { copiedChart, readOnlyOrders, isReadOnly, setIsReadOnly } =
    useCopiedChartStore()
  const { isPreviewDialogOpen, setPreviewDialogOpen } = usePreviewDialogStore()

  const handleOpenPreviewDialog = (isOpen: boolean) => {
    setPreviewDialogOpen(isOpen)
    setIsReadOnly(false)
  }

  return (
    <Dialog open={isPreviewDialogOpen} onOpenChange={handleOpenPreviewDialog}>
      <DialogContent className="sm:min-w-[1200px]">
        <DialogHeader>
          <DialogTitle>차트 미리보기</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <div className="max-h-[800px] overflow-y-auto">
          {isReadOnly ? (
            <ReadOnlyChartTable chartOrderData={readOnlyOrders!} />
          ) : (
            <ChartTable preview chartData={copiedChart!} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
