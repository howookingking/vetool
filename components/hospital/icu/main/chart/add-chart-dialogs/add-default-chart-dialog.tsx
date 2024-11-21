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
import { registerDefaultChart } from '@/lib/services/icu/chart/add-icu-chart'
import { cn } from '@/lib/utils/utils'
import type { SelectedChart } from '@/types/icu/chart'
import { File, LoaderCircle } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'

export default function AddDefaultChartDialog({
  chartData,
}: {
  chartData?: SelectedChart
}) {
  const { hos_id } = useParams()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleAddDefaultChart = async () => {
    setIsLoading(true)
    await registerDefaultChart(
      hos_id as string,
      chartData?.icu_chart_id as string,
    )

    toast({
      title: '기본형식의 차트를 생성했습니다',
    })
    setIsLoading(false)
    setIsDialogOpen(false)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex h-1/3 w-full items-center justify-center gap-2 md:w-1/4"
        >
          <File size={20} />
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
            생성
            <LoaderCircle
              className={cn(isLoading ? 'animate-spin' : 'hidden')}
            />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
