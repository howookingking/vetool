import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils/utils'
import { useRef, useState } from 'react'

type TxImageUploadInputProps = {
  images: File[]
  onImagesChange: (newImages: File[]) => void
  bucketImagesCount: number
}

/**
 * 이미지 업로드 Drag & Drop 영역
 */
export default function TxImageUploadInput({
  images,
  onImagesChange,
  bucketImagesCount,
}: TxImageUploadInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [showWarning, setShowWarning] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    setShowWarning(false)

    if (files) {
      if (files.length + bucketImagesCount > 10) {
        setShowWarning(true)
        return
      }

      const newImages = [...images]

      Array.from(files).forEach(async (file) => {
        const reader = new FileReader()

        newImages.push(file)
        onImagesChange(newImages)
        reader.readAsDataURL(file)
      })
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files) {
      const newImages = [...images]
      Array.from(files).forEach((file) => {
        newImages.push(file)
        if (newImages.length > 10) newImages.shift()
      })
      onImagesChange(newImages)
    }
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={cn(
        `flex h-32 w-full items-center justify-center rounded-md border-2 border-dashed text-center`,
        isDragging ? 'border-blue-500 bg-blue-100' : 'bg-gray-100',
      )}
    >
      <Label className="flex h-full w-full cursor-pointer items-center justify-center">
        <Input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageUpload}
          className="hidden"
          multiple
        />

        {showWarning ? (
          <span className="px-4 text-destructive">
            🚨 파일은 최대 10개까지 업로드 가능합니다.
          </span>
        ) : (
          <span className="px-4 text-gray-500">
            이미지 파일을 드래그하거나 클릭하여 선택하세요 (최대 10개)
          </span>
        )}
      </Label>
    </div>
  )
}
