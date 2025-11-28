import SubmitButton from '@/components/common/submit-button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { deleteAllCharts } from '@/lib/services/icu/chart/delete-icu-chart'
import type { SelectedIcuChart } from '@/types/icu/chart'
import { Undo2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import DialogTriggerButton from './dialog-trigger-button'

type Props = {
  selectedIcuChart: SelectedIcuChart
}

export default function UndoIoDialog({ selectedIcuChart }: Props) {
  const { push } = useRouter()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleDeleteFirstChart = async () => {
    setIsLoading(true)

    await deleteAllCharts(selectedIcuChart.icu_io.icu_io_id)

    toast.success('입원을 취소했습니다')

    setIsLoading(false)
    setIsDialogOpen(false)

    push(
      `/hospital/${selectedIcuChart.hos_id}/icu/${selectedIcuChart.target_date}/chart`,
    )
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTriggerButton
        icon={Undo2Icon}
        title="입원 취소"
        className="order-last"
      />

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            입원 취소
          </DialogTitle>

          <DialogDescription>입원을 취소합니다</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <SubmitButton
            buttonText="확인"
            onClick={handleDeleteFirstChart}
            isPending={isLoading}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
