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
import { Share2Icon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

type Props = {
  icuIoId: string
  targetDate: string
}

export default function ShareChartDialog({ icuIoId, targetDate }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [sharedChartUrl, setSharedChartUrl] = useState('')

  useEffect(() => {
    setSharedChartUrl(
      `${window.location.origin}/share/${icuIoId}?target-date=${targetDate}`,
    )
  }, [icuIoId, targetDate])

  const handleCopy = () => {
    navigator.clipboard.writeText(sharedChartUrl)

    setIsDialogOpen(false)

    toast.success('링크가 클립보드에 복사되었습니다.')
  }

  const handleMove = () => {
    window.open(sharedChartUrl, '_blank')
    setIsDialogOpen(false)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Share2Icon />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>차트 공유</DialogTitle>
          <DialogDescription>
            입원기간 동안의 차트를 링크로 공유할 수 있습니다
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline" tabIndex={-1} size="sm">
              닫기
            </Button>
          </DialogClose>
          <Button variant="secondary" onClick={handleCopy}>
            링크 복사
          </Button>

          <Button onClick={handleMove}>이동</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
