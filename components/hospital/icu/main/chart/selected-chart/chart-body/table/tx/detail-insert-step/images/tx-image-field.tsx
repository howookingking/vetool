import TxImageViewDialog from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/tx/detail-insert-step/images/view/tx-image-view-dialog'
import TxImageUploadDialog from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/tx/detail-insert-step/images/upload/tx-image-upload-dialog'
import { Label } from '@/components/ui/label'
import { type TxLocalState } from '@/lib/store/icu/tx-mutation'
import { type ImageUrlResponse } from '@/types/images'
import { Dispatch, SetStateAction, useState } from 'react'

type TxImageFieldProps = {
  txLocalState: TxLocalState
  setTxLocalState: (state: TxLocalState) => void
  bucketImages: ImageUrlResponse[]
  setBucketImages: Dispatch<SetStateAction<ImageUrlResponse[]>>
  isLoading: boolean
}

export default function TxImageField({
  txLocalState,
  setTxLocalState,
  bucketImages,
  setBucketImages,
  isLoading,
}: TxImageFieldProps) {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)

  const handleDeleteTempImage = (index: number) => {
    if (!txLocalState?.txImages) return

    const updatedImages = [...txLocalState.txImages]
    updatedImages.splice(index, 1)

    setTxLocalState({
      ...txLocalState,
      txImages: updatedImages,
    })
  }

  const handleDeleteBucketImage = async (index: number) => {
    if (!bucketImages || !txLocalState?.txId) return

    const key = `icu-${txLocalState.txId}-${index}`

    await fetch(`/api/image?key=${key}`, {
      method: 'DELETE',
    })

    setBucketImages((prev: ImageUrlResponse[]) =>
      prev.filter((_, i: number) => i !== index),
    )

    setTxLocalState({
      ...txLocalState,
      bucketImagesLength: txLocalState?.bucketImagesLength
        ? txLocalState?.bucketImagesLength - 1
        : 0,
    })
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Label htmlFor="image">이미지 / 동영상</Label>
        <TxImageUploadDialog
          bucketImagesCount={bucketImages?.length || 0}
          txLocalState={txLocalState}
          setTxLocalState={setTxLocalState}
          isUploadDialogOpen={isUploadDialogOpen}
          setIsUploadDialogOpen={setIsUploadDialogOpen}
        />
      </div>

      <TxImageViewDialog
        isLoading={isLoading}
        bucketImages={bucketImages}
        txLocalState={txLocalState}
        handleDeleteBucketImage={handleDeleteBucketImage}
        handleDeleteTempImage={handleDeleteTempImage}
      />
    </>
  )
}
