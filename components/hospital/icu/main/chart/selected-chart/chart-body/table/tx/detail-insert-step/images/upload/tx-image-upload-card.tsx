import TxImageUploadInput from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/tx/detail-insert-step/images/upload/tx-image-upload-input'
import TxImageUploadPreview from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/tx/detail-insert-step/images/upload/tx-image-upload-preview'
import { Card } from '@/components/ui/card'

type TxImageUploadCardProps = {
  images: File[]
  onImagesChange: (newImages: File[]) => void
  bucketImagesCount: number
}

/**
 * 이미지 업로드 카드 영역
 */
export default function TxImageUploadCard({
  images,
  onImagesChange,
  bucketImagesCount,
}: TxImageUploadCardProps) {
  return (
    <Card className="flex flex-col gap-4 border border-dashed border-gray-300 p-4">
      <TxImageUploadInput
        images={images}
        onImagesChange={onImagesChange}
        bucketImagesCount={bucketImagesCount}
      />
      <TxImageUploadPreview images={images} onImagesChange={onImagesChange} />
    </Card>
  )
}
