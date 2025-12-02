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
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import { Share2Icon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

type Props = {
  icuIoId: string
  targetDate: string
}

export default function ShareChartDialog({ icuIoId, targetDate }: Props) {
  const {
    basicHosData: {
      orderColorDisplay,
      orderColorsData,
      showOrderer,
      timeGuidelineData,
      vitalRefRange,
      isInChargeSystem,
    },
  } = useBasicHosDataContext()

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const shareChartUrl =
    `${window.location.origin}/share/${icuIoId}?` +
    `targetDate=${encodeURIComponent(targetDate)}` +
    `&orderColorDisplay=${encodeURIComponent(orderColorDisplay)}` +
    `&orderColors=${encodeURIComponent(JSON.stringify(orderColorsData))}` +
    `&showOrderer=${encodeURIComponent(showOrderer)}` +
    `&timeGuideline=${encodeURIComponent(JSON.stringify(timeGuidelineData))}` +
    `&vitalRefRange=${encodeURIComponent(JSON.stringify(vitalRefRange))}` +
    `&isInChargeSystem=${encodeURIComponent(isInChargeSystem)}`

  const handleCopy = () => {
    navigator.clipboard.writeText(shareChartUrl)

    setIsDialogOpen(false)

    toast.success('링크가 클립보드에 복사되었습니다.')
  }

  const handleMove = () => {
    window.open(shareChartUrl, '_blank')
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
