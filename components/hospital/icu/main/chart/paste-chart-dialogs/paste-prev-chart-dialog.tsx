import SubmitButton from '@/components/common/submit-button'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useSafeRefresh } from '@/hooks/use-realtime-refresh'
import { copyPrevChart } from '@/lib/services/icu/chart/add-icu-chart'
import { ClipboardPasteIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import DialogTriggerButton from './dialog-trigger-button'

type Props = {
  targetDate: string
  patientId: string
}

export default function PastePrevChartDialog({ targetDate, patientId }: Props) {
  const safeRefresh = useSafeRefresh()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleCopyPrevSelectedChart = async () => {
    setIsLoading(true)

    const { error } = await copyPrevChart(targetDate, patientId)

    if (error) {
      console.log(error)
      toast.error('전날 차트를 복사할 수 없습니다', {
        description: '전날 차트가 있는지 확인해주세요',
      })

      setIsLoading(false)
      setIsDialogOpen(false)
      return
    }

    toast.success('전날 차트를 복사하였습니다')

    setIsLoading(false)
    setIsDialogOpen(false)

    safeRefresh()
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTriggerButton
        icon={ClipboardPasteIcon}
        title="전날 차트 붙여넣기"
      />

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>전날 차트 붙여넣기</DialogTitle>
          <DialogDescription>
            전날 차트를 복사하여 {targetDate} 차트가 생성됩니다
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2 md:gap-0">
          <DialogClose asChild>
            <Button size="sm" type="button" variant="outline" tabIndex={-1}>
              취소
            </Button>
          </DialogClose>

          <SubmitButton
            buttonText="확인"
            onClick={handleCopyPrevSelectedChart}
            isPending={isLoading}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
