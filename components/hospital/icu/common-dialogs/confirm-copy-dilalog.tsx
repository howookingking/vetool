import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { toast } from '@/components/ui/use-toast'
import { pasteChart } from '@/lib/services/icu/paste-chart'
import { useIcuBookmarkStore } from '@/lib/store/icu/bookmark'
import { useCopiedChartStore } from '@/lib/store/icu/copied-chart'
import { useIcuSelectedPatientIdStore } from '@/lib/store/icu/icu-selected-patient'
import { useIsChartLoadingStore } from '@/lib/store/icu/is-chart-loading'
import { cn } from '@/lib/utils'
import { LoaderCircle } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'

export function ConfirmCopyDialog() {
  const { target_date } = useParams()
  const { selectedPatientId } = useIcuSelectedPatientIdStore()
  const { setBookmarkModalOpen } = useIcuBookmarkStore()
  const { setIsChartLoading } = useIsChartLoadingStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    isConfirmCopyDialogOpen,
    setIsConfirmCopyDialogOpen,
    copiedOrders,
    reset,
  } = useCopiedChartStore()

  const handleConfirmCopy = async () => {
    setIsSubmitting(true)
    setIsChartLoading(true)

    await pasteChart(selectedPatientId!, copiedOrders!, target_date as string)

    toast({
      title: '차트를 생성하였습니다',
    })

    reset()
    setIsSubmitting(false)
    setBookmarkModalOpen(false)
    setIsConfirmCopyDialogOpen(false)
  }
  return (
    <Dialog
      open={isConfirmCopyDialogOpen}
      onOpenChange={setIsConfirmCopyDialogOpen}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>차트를 생성하시겠습니까?</DialogTitle>
          <DialogDescription />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsConfirmCopyDialogOpen(false)}
            >
              취소
            </Button>
            <Button onClick={handleConfirmCopy} disabled={isSubmitting}>
              확인
              <LoaderCircle
                className={cn(isSubmitting ? 'ml-2 animate-spin' : 'hidden')}
              />
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
