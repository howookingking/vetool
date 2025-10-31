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
import { pasteDefaultOrders } from '@/lib/services/icu/chart/add-icu-chart'
import { cn } from '@/lib/utils/utils'
import type { SelectedIcuChart } from '@/types/icu/chart'
import { FileIcon, LoaderCircleIcon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export default function PasteDefaultChartDialog({
  selectedIcuChart,
}: {
  selectedIcuChart: SelectedIcuChart
}) {
  const { hos_id } = useParams()
  const { refresh } = useRouter()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleAddDefaultChart = async () => {
    setIsLoading(true)

    await pasteDefaultOrders(hos_id as string, selectedIcuChart.icu_chart_id)

    toast.success('기본형식의 차트를 생성했습니다')

    setIsLoading(false)
    setIsDialogOpen(false)
    refresh()
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex h-1/3 w-full items-center justify-center gap-2 md:w-2/3 lg:w-1/2"
        >
          <FileIcon size={20} />
          <span>기본형식 차트생성</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>기본형식 차트 생성</DialogTitle>
          <DialogDescription>기본 형식의 차트가 생성됩니다</DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2 md:gap-0">
          <DialogClose asChild>
            <Button type="button" variant="outline" tabIndex={-1}>
              취소
            </Button>
          </DialogClose>
          <Button onClick={handleAddDefaultChart} disabled={isLoading}>
            확인
            <LoaderCircleIcon
              className={cn(isLoading ? 'animate-spin' : 'hidden')}
            />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
