import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { X } from 'lucide-react'
import Image from 'next/image'

/**
 * 이미지 업로드 미리보기
 */
export default function TxImageUploadPreview({
  images,
  onImagesChange,
}: {
  images: File[]
  onImagesChange: (newImages: File[]) => void
}) {
  const handleDeleteImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)

    onImagesChange(newImages)
  }

  return (
    <div className="flex flex-wrap gap-2">
      {images.map((image, index) => (
        <Dialog key={image.name}>
          <DialogTrigger asChild>
            <div className="relative h-24 w-24 cursor-pointer">
              <Image
                src={URL.createObjectURL(image)}
                fill
                alt={`이미지 ${index + 1}`}
                className="rounded-md object-cover"
                unoptimized
              />
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  handleDeleteImage(index)
                }}
                variant="outline"
                className="absolute right-1 top-1 h-5 w-5 rounded-full border-none bg-black bg-opacity-50 p-0 transition-colors duration-200 hover:bg-black"
              >
                <X size={12} strokeWidth={3} className="text-white" />
              </Button>
            </div>
          </DialogTrigger>

          <DialogContent className="max-w-[90vw] sm:max-w-[80vw]">
            <DialogTitle />
            <DialogDescription />
            <div className="relative h-[80vh] w-full">
              <Image
                src={URL.createObjectURL(image)}
                fill
                alt={`이미지 ${index + 1}`}
                className="object-contain"
                unoptimized
              />
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  )
}
