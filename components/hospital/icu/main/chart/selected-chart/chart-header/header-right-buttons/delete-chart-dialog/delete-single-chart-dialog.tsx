import SubmitButton from '@/components/common/submit-button'
import WarningMessage from '@/components/common/warning-message'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useSafeRefresh } from '@/hooks/use-realtime-refresh'
import {
  deleteChart,
  deleteOrders,
} from '@/lib/services/icu/chart/delete-icu-chart'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { toast } from 'sonner'

type Props = {
  isFirstChart: boolean
  icuChartId: string
  patientName: string
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
  targetDate: string
}

export default function DeleteSingleChartDialog({
  isFirstChart,
  icuChartId,
  patientName,
  setIsDialogOpen,
  targetDate,
}: Props) {
  const safeRefresh = useSafeRefresh()

  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteChart = async () => {
    setIsDeleting(true)

    // 첫 차트인 경우 오더만 삭제, 2일차이상의 경우 차트 전체 삭제
    isFirstChart
      ? await deleteOrders(icuChartId)
      : await deleteChart(icuChartId)

    toast.success('차트를 삭제하였습니다')

    setIsDeleting(false)
    setIsDialogOpen(false)
    safeRefresh()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" disabled={isDeleting}>
          해당일 차트 삭제
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{patientName}의 차트를 삭제하시겠습니까?</DialogTitle>

          <DialogDescription className="flex flex-col gap-1">
            {targetDate} 차트가 삭제됩니다.
            <WarningMessage text="해당작업은 실행 후 되될릴 수 없습니다." />
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              닫기
            </Button>
          </DialogClose>

          <SubmitButton
            variant="destructive"
            isPending={isDeleting}
            onClick={handleDeleteChart}
            buttonText="삭제"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
