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
import { Share2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ShareChartDialog({ icuIoId }: { icuIoId: string }) {
  const { target_date } = useParams()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [sharedChartUrl, setSharedChartUrl] = useState('')

  // const sharedChartUrl = `${window.location.origin}/hospital/share/${icuIoId}?target-date=${target_date}`
  // 할 경우 서버에서 window 못 읽음
  useEffect(() => {
    setSharedChartUrl(
      `${window.location.origin}/hospital/share/${icuIoId}?target-date=${target_date}`,
    )
  }, [icuIoId, target_date])

  const handleCopy = () => {
    navigator.clipboard.writeText(sharedChartUrl)

    setIsDialogOpen(false)
    toast({
      title: '클립보드에 링크가 복사되었습니다.',
    })
  }

  const handleMove = () => {
    window.open(sharedChartUrl, '_blank')
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
            외부인에게 입원기간 동안의 차트를 링크로 공유할 수 있습니다
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={handleCopy}>
            클립보드 복사
          </Button>
          <Button onClick={handleMove}>이동</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
