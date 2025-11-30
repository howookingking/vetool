import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { useSafeRefresh } from '@/hooks/use-realtime-refresh'
import {
  deleteChart,
  deleteOrders,
} from '@/lib/services/icu/chart/delete-icu-chart'
import { cn } from '@/lib/utils/utils'
import { LoaderCircleIcon } from 'lucide-react'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { toast } from 'sonner'
import DeleteAllChartDialog from './delete-all-chart-dialog'
import SubmitButton from '@/components/common/submit-button'

type Props = {
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
  isFirstChart: boolean
  icuChartId: string
  icuIoId: string
  patientName: string
  hosId: string
  targetDate: string
}

export default function DeleteChartButtons({
  setIsDialogOpen,
  isFirstChart,
  icuChartId,
  icuIoId,
  patientName,
  hosId,
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
    <>
      <DialogClose asChild>
        <Button type="button" variant="outline">
          닫기
        </Button>
      </DialogClose>

      <SubmitButton
        onClick={handleDeleteChart}
        buttonText="해당일 차트삭제"
        isPending={isDeleting}
        variant="secondary"
      />

      <DeleteAllChartDialog
        icuIoId={icuIoId}
        patientName={patientName}
        setIsDialogOpen={setIsDialogOpen}
        hosId={hosId}
        targetDate={targetDate}
      />
    </>
  )
}
