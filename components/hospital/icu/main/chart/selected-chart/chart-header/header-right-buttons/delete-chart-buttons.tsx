import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { toast } from '@/components/ui/use-toast'
import {
  deleteChart,
  deleteOrders,
} from '@/lib/services/icu/chart/delete-icu-chart'
import { cn } from '@/lib/utils/utils'
import { LoaderCircle } from 'lucide-react'
import { type Dispatch, type SetStateAction, useState } from 'react'
import DeleteAllChartDialog from './delete-chart-dialog/delete-all-chart-dialog'

type Props = {
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
  isFirstChart: boolean
  icuChartId: string
  icuIoId: string
  patientName: string
}

export default function DeleteChartButtons({
  setIsDialogOpen,
  isFirstChart,
  icuChartId,
  icuIoId,
  patientName,
}: Props) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteChart = async () => {
    setIsDeleting(true)

    // 첫 차트인 경우 오더만 삭제, 2일차이상의 경우 차트 전체 삭제
    isFirstChart
      ? await deleteOrders(icuChartId)
      : await deleteChart(icuChartId)

    toast({
      title: '차트가 삭제되었습니다',
    })

    setIsDeleting(false)
    setIsDialogOpen(false)
  }

  return (
    <>
      <DialogClose asChild>
        <Button type="button" variant="outline">
          취소
        </Button>
      </DialogClose>

      <Button onClick={handleDeleteChart} disabled={isDeleting}>
        해당일 차트삭제
        <LoaderCircle
          className={cn(isDeleting ? 'ml-2 animate-spin' : 'hidden')}
        />
      </Button>

      <DeleteAllChartDialog
        icuIoId={icuIoId}
        patientName={patientName}
        setIsDialogOpen={setIsDialogOpen}
      />
    </>
  )
}
