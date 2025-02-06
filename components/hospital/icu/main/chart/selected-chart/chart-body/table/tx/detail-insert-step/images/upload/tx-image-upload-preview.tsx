import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { X } from 'lucide-react'
import TxImage from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/tx/detail-insert-step/images/view/tx-image'

type TxImageUploadPreviewProps = {
  images: File[]
  onImagesChange: (newImages: File[]) => void
}

/**
 * 이미지 업로드 미리보기
 */
export default function TxImageUploadPreview({
  images,
  onImagesChange,
}: TxImageUploadPreviewProps) {
  const handleDeleteImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)

    onImagesChange(newImages)
  }

  return (
    <div className="flex flex-wrap gap-3">
      {images.map((image, index) => (
        <Dialog key={`${image.name}-${index}`} modal>
          <DialogTrigger asChild>
            <div className="relative h-24 w-24 cursor-pointer">
              <TxImage
                url={URL.createObjectURL(image)}
                contentType={image.type}
                index={index}
              />
              <Button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  handleDeleteImage(index)
                }}
                variant="outline"
                className="absolute right-1 top-1 h-5 w-5 rounded-full border-none bg-black bg-opacity-50 p-0 transition-colors duration-200 hover:bg-black"
                aria-label={`이미지 ${index + 1} 삭제`}
              >
                <X size={12} strokeWidth={3} className="text-white" />
              </Button>
            </div>
          </DialogTrigger>

          <DialogContent className="max-w-[90vw] sm:max-w-[80vw]">
            <DialogTitle />
            <DialogDescription />
            <div className="relative h-[80vh] w-full">
              <TxImage
                url={URL.createObjectURL(image)}
                contentType={image.type}
                index={index}
                className="object-contain"
                control
              />
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  )
}
