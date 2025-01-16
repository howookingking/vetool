import TxImageUploadCard from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/tx/detail-insert-step/images/upload/tx-image-upload-card'
import TxImageViewDialog from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/tx/detail-insert-step/images/tx-image-view-dialog'
import { Label } from '@/components/ui/label'
import type { TxLocalState } from '@/lib/store/icu/tx-mutation'

export default function TxImageContainer({
  txLocalState,
  setTxLocalState,
}: {
  txLocalState: TxLocalState
  setTxLocalState: (state: TxLocalState) => void
}) {
  return (
    <>
      <div className="flex items-center justify-between">
        <Label htmlFor="image">이미지 / 동영상</Label>
        {txLocalState?.txId && <TxImageViewDialog txId={txLocalState.txId} />}
      </div>

      <TxImageUploadCard
        txId={txLocalState?.txId}
        images={txLocalState?.txImages ?? []}
        onImagesChange={(newImages) =>
          setTxLocalState({ ...txLocalState, txImages: newImages })
        }
      />
    </>
  )
}
