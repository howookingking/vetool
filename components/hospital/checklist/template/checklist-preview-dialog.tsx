import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
// import { useCopiedChartStore } from '@/lib/store/icu/copied-chart'
import { usePreviewDialogStore } from '@/lib/store/icu/preview-dialog'

export default function ChecklistPreviewDialog() {
  //   const { copiedChart } = useCopiedChartStore()

  const { setPreviewDialogOpen, isPreviewDialogOpen } = usePreviewDialogStore()

  return (
    <Dialog open={isPreviewDialogOpen} onOpenChange={setPreviewDialogOpen}>
      <DialogContent className="sm:min-w-[1600px]">
        <DialogHeader>
          <DialogTitle>차트 미리보기</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <div className="max-h-[800px] overflow-y-auto">
          {/* <ChartTable preview chartData={copiedChart!} /> */}
        </div>
      </DialogContent>
    </Dialog>
  )
}
