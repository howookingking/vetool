import TxImageViewCarousel from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/tx/detail-insert-step/images/tx-image-view-carousel'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import type { ImageUrlResponse } from '@/types/images'
import { Image } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function TxImageViewDialog({ txId }: { txId: string }) {
  const [imageUrls, setImageUrls] = useState<ImageUrlResponse[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    if (!isDialogOpen) return

    const fetchImages = async () => {
      setIsLoading(true)

      const response = await fetch(`/api/image?prefix=icu-${txId}`)
      const data = await response.json()
      setImageUrls(data.urls)

      setIsLoading(false)
    }

    fetchImages()

    return () => setImageUrls([])
  }, [txId, isDialogOpen])

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Image /> 업로드 된 이미지 보기
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogTitle />
        <DialogDescription />

        <div className="h-[500px] w-full">
          <TxImageViewCarousel imageUrls={imageUrls} isLoading={isLoading} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
