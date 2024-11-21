'use client'

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
import { copyPrevChart } from '@/lib/services/icu/chart/add-icu-chart'
import { cn } from '@/lib/utils/utils'
import { ClipboardPaste, LoaderCircle } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'

export default function CopyPrevChartDialog() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { patient_id, target_date } = useParams()

  const handleCopyPrevSelectedChart = async () => {
    setIsLoading(true)
    const { error } = await copyPrevChart(
      target_date as string,
      patient_id as string,
    )

    if (error) {
      toast({
        title: '전날 차트를 복사할 수 없습니다',
        description: '전날 차트가 있는지 확인해주세요',
        variant: 'destructive',
      })
      setIsLoading(false)
      setIsDialogOpen(false)
      return
    }

    toast({
      title: '전날 차트를 복사하였습니다',
    })
    setIsLoading(false)
    setIsDialogOpen(false)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex h-[200px] w-full items-center justify-center gap-2 md:h-1/3 md:w-1/4"
        >
          <ClipboardPaste size={20} />
          <span>전일 차트복사</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>전일차트복사</DialogTitle>
          <DialogDescription>
            전일차트를 복사하여 {target_date} 차트가 생성됩니다
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2 md:gap-0">
          <DialogClose asChild>
            <Button type="button" variant="outline" tabIndex={-1}>
              취소
            </Button>
          </DialogClose>
          <Button onClick={handleCopyPrevSelectedChart} disabled={isLoading}>
            복사
            <LoaderCircle
              className={cn(isLoading ? 'animate-spin' : 'hidden')}
            />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
