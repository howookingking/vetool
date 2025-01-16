import TxImageUploadInput from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/tx/detail-insert-step/images/upload/tx-image-upload-input'
import TxImageUploadPreview from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/tx/detail-insert-step/images/upload/tx-image-upload-preview'
import { Card } from '@/components/ui/card'

/**
 * 이미지 업로드 카드 영역
 */
export default function TxImageUploadCard({
  txId,
  images,
  onImagesChange,
}: {
  txId: string | undefined
  images: File[]
  onImagesChange: (newImages: File[]) => void
}) {
  return (
    <Card className="flex flex-col gap-4 border border-dashed border-gray-300 p-4">
      <TxImageUploadInput images={images} onImagesChange={onImagesChange} />
      <TxImageUploadPreview images={images} onImagesChange={onImagesChange} />
    </Card>
  )
}
