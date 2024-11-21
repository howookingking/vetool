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
import { toast } from '@/components/ui/use-toast'
import {
  deleteAllCharts,
  deleteChart,
  deleteOrders,
} from '@/lib/services/icu/chart/delete-icu-chart'
import { cn } from '@/lib/utils/utils'
import { LoaderCircle, Trash2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'

export default function DeleteChartDialog({
  icuChartId,
  name,
  icuIoId,
  isFirstChart,
}: {
  icuChartId: string
  name: string
  icuIoId: string
  isFirstChart: boolean
}) {
  const { target_date } = useParams()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
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
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Trash2 size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{name}의 차트를 삭제하시겠습니까?</DialogTitle>
          <DialogDescription className="flex flex-col gap-1">
            <span>선택차트삭제 : {target_date}날 차트만 삭제합니다</span>
            <span>모든차트삭제 : 입원기간동안의 차트들을 모두 삭제합니다</span>
            <WarningMessage text="해당작업은 실행 후 되될릴 수 없습니다." />
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
