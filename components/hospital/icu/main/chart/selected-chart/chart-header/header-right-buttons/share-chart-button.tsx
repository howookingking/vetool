'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { toast } from '@/components/ui/use-toast'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import { Share2 } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function ShareChartButton({
  icuIoId,
  targetDate,
  mainVetName,
}: {
  icuIoId: string
  targetDate: string
  mainVetName?: string
}) {
  const {
    basicHosData: { orderColorDisplay },
  } = useBasicHosDataContext()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [shareUrl, setShareUrl] = useState('')

  useEffect(() => {
    setShareUrl(
      `${window.location.origin}/hospital/share/${icuIoId}?target-date=${targetDate}&display=${orderColorDisplay}&main-vet=${mainVetName}`,
    )
  }, [icuIoId, targetDate, orderColorDisplay, mainVetName])

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl)

    setIsDialogOpen(false)
    toast({
      title: '클립보드에 링크가 복사되었습니다.',
    })
  }

  const handleMove = () => {
    window.open(shareUrl, '_blank')
    setIsDialogOpen(false)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Share2 size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>입원 환자 차트 공유</DialogTitle>
          <DialogDescription>
            입원기간 동안의 차트를 외부에 링크로 공유할 수 있습니다
            <br />
            퇴원 시 공유 페이지가 만료됩니다
            <br />
            <br />
            1. 클립보드에 복사: 공유 페이지 링크가 클립보드에 복사됩니다
            <br />
            2. 이동: 공유 페이지로 이동합니다
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={handleCopy}>
            클립보드에 복사
          </Button>
          <Button onClick={handleMove}>이동</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
