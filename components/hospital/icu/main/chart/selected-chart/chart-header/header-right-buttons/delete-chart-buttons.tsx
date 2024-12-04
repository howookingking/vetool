import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { toast } from '@/components/ui/use-toast'
import {
  deleteAllCharts,
  deleteChart,
  deleteOrders,
} from '@/lib/services/icu/chart/delete-icu-chart'
import { cn } from '@/lib/utils/utils'
import { LoaderCircle } from 'lucide-react'
import { Dispatch, SetStateAction, useState } from 'react'

export default function DeleteChartButtons({
  setIsDialogOpen,
  isFirstChart,
  icuChartId,
  icuIoId,
}: {
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
  isFirstChart: boolean
  icuChartId: string
  icuIoId: string
}) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isDeletingAll, setIsDeletingAll] = useState(false)

  const handleDeleteChart = async () => {
    setIsDeleting(true)

    // 첫 차트인 경우 오더만 삭제, 2일차이상의 경우 차트 전체 삭제
    if (isFirstChart) {
      await deleteOrders(icuChartId)
    } else {
      await deleteChart(icuChartId)
    }

    toast({
      title: '차트가 삭제되었습니다',
    })
    setIsDeleting(false)
    setIsDialogOpen(false)
  }
  const handleDeleteAllCharts = async () => {
    setIsDeletingAll(true)

    await deleteAllCharts(icuIoId)

    toast({
      title: `${name}의 모든차트가 삭제되었습니다`,
    })
    setIsDeletingAll(false)
    setIsDialogOpen(false)
  }

  return (
    <>
      <DialogClose asChild>
        <Button type="button" variant="outline">
          취소
        </Button>
      </DialogClose>
      <Button
        onClick={handleDeleteChart}
        disabled={isDeleting || isDeletingAll}
      >
        선택차트삭제
        <LoaderCircle
          className={cn(isDeleting ? 'ml-2 animate-spin' : 'hidden')}
        />
      </Button>
      <Button
        onClick={handleDeleteAllCharts}
        variant="destructive"
        disabled={isDeleting || isDeletingAll}
      >
        모든차트삭제
        <LoaderCircle
          className={cn(isDeletingAll ? 'ml-2 animate-spin' : 'hidden')}
        />
      </Button>
    </>
  )
}
