import HelperTooltip from '@/components/common/helper-tooltip'
import StepBadge from '@/components/common/step-badge'
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
import { pasteDefaultIcuChart } from '@/lib/services/icu/chart/add-icu-chart'
import { ClipboardListIcon, CrownIcon, SyringeIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import DialogTriggerButton from './dialog-trigger-button'

type Props = {
  icuChartId: string
  hosId: string
}

export default function PasteDefaultChartDialog({ icuChartId, hosId }: Props) {
  const safeRefresh = useSafeRefresh()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleAddDefaultChart = async () => {
    setIsLoading(true)

    await pasteDefaultIcuChart(hosId, icuChartId)

    toast.success('기본형식의 차트를 생성했습니다')

    setIsLoading(false)
    setIsDialogOpen(false)

    safeRefresh()
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTriggerButton
        icon={ClipboardListIcon}
        title="기본 차트 붙여넣기"
      />

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            기본차트 붙여넣기
          </DialogTitle>

          <DialogDescription>기본형식의 차트를 생성합니다</DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2 md:gap-0">
          <DialogClose asChild>
            <Button type="button" variant="outline" tabIndex={-1} size="sm">
              취소
            </Button>
          </DialogClose>

          <SubmitButton
            buttonText="확인"
            onClick={handleAddDefaultChart}
            isPending={isLoading}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
