import TxImage from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/tx/detail-insert-step/images/view/tx-image'
import TxImageViewCarousel from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/tx/detail-insert-step/images/view/tx-image-view-carousel'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { type TxLocalState } from '@/lib/store/icu/tx-mutation'
import { type ImageUrlResponse } from '@/types/images'
import { X } from 'lucide-react'
import { useState } from 'react'
import TxImageViewSkeleton from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/tx/detail-insert-step/images/view/tx-image-view-skeleton'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

type TxImageViewDialogProps = {
  isLoading: boolean
  bucketImages: ImageUrlResponse[]
  txLocalState: TxLocalState
  handleDeleteBucketImage: (index: number) => void
  handleDeleteTempImage: (index: number) => void
  totalImageCount: number
}

/**
 * 처치 상세 다이얼로그 내 이미지 뷰 다이얼로그
 */
export default function TxImageViewDialog({
  isLoading,
  bucketImages,
  txLocalState,
  handleDeleteBucketImage,
  handleDeleteTempImage,
  totalImageCount,
}: TxImageViewDialogProps) {
  const [isCarouselDialogOpen, setIsCarouselDialogOpen] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  return (
    <>
      <ScrollArea className="w-full">
        <div className="flex min-h-20 gap-6 px-1">
          {isLoading ? (
            <TxImageViewSkeleton />
          ) : (
            <>
              {bucketImages?.map((image, index) => (
                <div
                  key={image.url}
                  className="relative h-20 w-20 cursor-pointer"
                  onClick={() => {
                    setSelectedImageIndex(index)
                    setIsCarouselDialogOpen(true)
                  }}
                >
                  <TxImage
                    url={image.url}
                    contentType={image.contentType}
                    index={index}
                  />
                  <Button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteBucketImage(index)
                    }}
                    variant="outline"
                    className="absolute right-1 top-1 h-5 w-5 rounded-full border-none bg-black bg-opacity-50 p-0 transition-colors duration-200 hover:bg-black"
                  >
                    <X size={12} strokeWidth={3} className="text-white" />
                  </Button>
                </div>
              ))}

              {txLocalState?.txImages?.map((image, index) => (
                <div
                  key={index}
                  className="relative h-20 w-20 cursor-pointer"
                  onClick={() => {
                    setSelectedImageIndex(index + (bucketImages?.length || 0))
                    setIsCarouselDialogOpen(true)
                  }}
                >
                  <TxImage
                    url={URL.createObjectURL(image)}
                    contentType={image.type}
                    index={index + (bucketImages?.length || 0)}
                  />
                  <Button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteTempImage(index)
                    }}
                    variant="outline"
                    className="absolute right-1 top-1 h-5 w-5 rounded-full border-none bg-black bg-opacity-50 p-0 transition-colors duration-200 hover:bg-black"
                  >
                    <X size={12} strokeWidth={3} className="text-white" />
                  </Button>
                </div>
              ))}
            </>
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <Dialog
        open={isCarouselDialogOpen}
        onOpenChange={setIsCarouselDialogOpen}
      >
        <DialogContent className="max-w-[90vw] sm:max-w-[80vw]">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-lg font-bold">
                처치 이미지 보기
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-500">
                총 {totalImageCount}개의 이미지
              </DialogDescription>
            </div>
          </div>

          <TxImageViewCarousel
            isLoading={isLoading}
            bucketImages={bucketImages}
            tempImages={txLocalState?.txImages}
            initialSlide={selectedImageIndex}
          />

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsCarouselDialogOpen(false)}
            >
              닫기
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
