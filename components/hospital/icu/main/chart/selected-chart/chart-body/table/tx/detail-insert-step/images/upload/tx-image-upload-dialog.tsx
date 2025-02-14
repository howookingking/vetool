import TxImageUploadCard from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/tx/detail-insert-step/images/upload/tx-image-upload-card'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { type TxLocalState } from '@/lib/store/icu/icu-tx'
import { Image as ImageIcon } from 'lucide-react'

type TxImageUploadDialogProps = {
  bucketImagesCount: number
  txLocalState: TxLocalState
  setTxLocalState: (state: TxLocalState) => void
  isUploadDialogOpen: boolean
  setIsUploadDialogOpen: (open: boolean) => void
}

/**
 * 이미지 업로드 팝업 다이얼로그
 */
export default function TxImageUploadDialog({
  bucketImagesCount,
  txLocalState,
  setTxLocalState,
  isUploadDialogOpen,
  setIsUploadDialogOpen,
}: TxImageUploadDialogProps) {
  return (
    <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <ImageIcon /> 이미지 업로드
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle />
        <DialogDescription />

        <TxImageUploadCard
          images={txLocalState?.txImages ?? []}
          onImagesChange={(newImages) =>
            setTxLocalState({ ...txLocalState, txImages: newImages })
          }
          bucketImagesCount={bucketImagesCount}
        />

        <DialogFooter>
          <Button
            disabled={!txLocalState?.txImages}
            onClick={() => setIsUploadDialogOpen(false)}
          >
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
