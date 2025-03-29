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
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

export default function PastePrevChartDialog() {
  const { refresh } = useRouter()
  const { patient_id, target_date } = useParams()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleCopyPrevSelectedChart = async () => {
    setIsLoading(true)

    const { error } = await copyPrevChart(
      target_date as string,
      patient_id as string,
    )

    if (error) {
      toast({
        title: '전일 차트를 복사할 수 없습니다',
        description: '전일 차트가 있는지 확인해주세요',
        variant: 'destructive',
      })
      setIsLoading(false)
      setIsDialogOpen(false)
      return
    }

    toast({
      title: '전일 차트를 복사하였습니다',
    })
    setIsLoading(false)
    setIsDialogOpen(false)
    refresh()
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex h-1/3 w-full items-center justify-center gap-2 md:h-1/3 md:w-2/3 lg:w-1/2"
        >
          <ClipboardPaste size={20} />
          <span>전일 차트 붙여넣기</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>전일 차트 붙여넣기</DialogTitle>
          <DialogDescription>
            전일 차트를 복사하여 {target_date} 차트가 생성됩니다
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2 md:gap-0">
          <DialogClose asChild>
            <Button type="button" variant="outline" tabIndex={-1}>
              취소
            </Button>
          </DialogClose>
          <Button onClick={handleCopyPrevSelectedChart} disabled={isLoading}>
            확인
            <LoaderCircle
              className={cn(isLoading ? 'animate-spin' : 'hidden')}
            />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
