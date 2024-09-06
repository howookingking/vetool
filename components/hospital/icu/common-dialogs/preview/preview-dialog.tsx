import PreviewTable from '@/components/hospital/icu/common-dialogs/preview/preview-table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useCopiedChartStore } from '@/lib/store/icu/copied-chart'
import { useOrderPreviewStore } from '@/lib/store/icu/order-preview'
import type { IcuOrderColors } from '@/types/adimin'
import { DialogDescription } from '@radix-ui/react-dialog'

export default function PreviewDialog({
  orderColors,
}: {
  orderColors: IcuOrderColors
}) {
  const { copiedOrders } = useCopiedChartStore()
  const { isPreviewModalOpen, setPreviewModalOpen } = useOrderPreviewStore()

  return (
    <Dialog open={isPreviewModalOpen} onOpenChange={setPreviewModalOpen}>
      <DialogContent className="sm:min-w-[1200px]">
        <DialogHeader>
          <DialogTitle>차트 미리보기</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <PreviewTable copiedOrders={copiedOrders!} orderColors={orderColors} />
      </DialogContent>
    </Dialog>
  )
}
