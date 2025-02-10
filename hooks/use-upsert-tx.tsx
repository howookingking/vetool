import { toast } from '@/components/ui/use-toast'
import { upsertIcuTx } from '@/lib/services/icu/chart/tx-mutation'
import { uploadTxImages } from '@/lib/services/icu/chart/upload-images'
import { OrderTimePendingQueue } from '@/lib/store/icu/icu-order'
import type { TxLocalState } from '@/lib/store/icu/tx-mutation'
import type { TxLog } from '@/types/icu/chart'
import { format } from 'date-fns'
import { useState } from 'react'

type TxUpdateOptions = {
  hosId: string
  onSuccess?: () => void
}

export default function useUpsertTx({ hosId, onSuccess }: TxUpdateOptions) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const upsertTx = async (txLocalState: TxLocalState, logs: TxLog[] = []) => {
    if (isSubmitting) return

    try {
      setIsSubmitting(true)
      const txState = { ...txLocalState }
      const images = txState.txImages
      const bucketImagesLength = txState.bucketImagesLength ?? 0

      // !! 이미지 관련 필드 제거 (페이로드 비대 방지)
      delete txState.txImages
      delete txState.bucketImagesLength

      // 단일 간편 코멘트($) 입력한 경우
      if (txState.txResult?.includes('$')) {
        const [result, comment] = txState.txResult.split('$')
        txState.txResult = result.trim()
        txState.txComment = comment.trim()
      }

      // checklist에 'kg' 단위 입력 시 단위 제거
      // 'checklist'라는 orderType은 불변하지만, 오더명은 가변하므로 orderType으로 체크
      if (
        txState.icuChartOrderType === 'checklist' &&
        txState.txResult?.includes('kg')
      ) {
        txState.txResult = txState.txResult?.replace('kg', '')
      }

      const result = await upsertIcuTx(
        hosId,
        txState,
        format(new Date(), 'yyyy-MM-dd'),
        images?.length ?? 0,
        logs,
      )

      // TX 입력 후, 반환된 TX ID를 통해 이미지 업로드
      if (result.success && images) {
        try {
          await uploadTxImages(
            images,
            result.txId,
            bucketImagesLength.toString(),
          )
        } catch (error) {
          console.error('이미지 업로드 실패:', error)
          toast({
            variant: 'destructive',
            title: '처치 내역은 저장되었으나 이미지 업로드에 실패했습니다.',
            description: '다시 시도해주세요.',
          })
          setIsSubmitting(false)
          return
        }
      }

      toast({
        title: '처치 내역이 업데이트 되었습니다',
      })

      onSuccess?.()
    } catch (error) {
      console.error('처치 내역 업데이트 실패:', error)
      toast({
        variant: 'destructive',
        title: '처치 내역 업데이트에 실패했습니다',
        description: '다시 시도해주세요.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // 다중 Tx 입력
  const upsertMultipleTx = async (
    txPendingQueue: OrderTimePendingQueue[],
    values: {
      result?: string | null
      comment?: string | null
      isCrucialChecked?: boolean
      orderName?: string
      orderType?: string
      updatedLogs: TxLog[]
      txImages?: File[]
      bucketImagesLength?: number
    },
  ) => {
    if (isSubmitting) return

    try {
      setIsSubmitting(true)
      // !! 이미지 정보를 별도로 저장
      const images = values.txImages
      const bucketImagesLength = values.bucketImagesLength

      const txStates = txPendingQueue.map((item) => ({
        state: {
          txId: item.txId,
          txResult: values.result,
          txComment: values.comment,
          time: item.orderTime,
          icuChartOrderId: item.orderId,
          isCrucialChecked: values.isCrucialChecked,
          icuChartOrderName: values.orderName,
          icuChartOrderType: values.orderType,
        },
        logs:
          values.result && values.result.trim() !== ''
            ? [...(item.txLog ?? []), ...values.updatedLogs]
            : (item.txLog ?? []),
      }))

      const results = await Promise.all(
        txStates.map(({ state, logs }) =>
          upsertIcuTx(hosId, state, format(new Date(), 'yyyy-MM-dd'), 0, logs),
        ),
      )

      if (images) {
        try {
          await Promise.all(
            results
              .filter((result) => result.success)
              .map((result) =>
                uploadTxImages(
                  images,
                  result.txId,
                  (bucketImagesLength || 0).toString(),
                ),
              ),
          )
        } catch (error) {
          console.error('이미지 업로드 실패:', error)
          toast({
            variant: 'destructive',
            title: '처치 내역은 저장되었으나 이미지 업로드에 실패했습니다.',
            description: '다시 시도해주세요.',
          })
          setIsSubmitting(false)
          return
        }
      }

      toast({
        title: '처치 내역이 업데이트 되었습니다',
      })

      onSuccess?.()
    } catch (error) {
      console.error('처치 내역 업데이트 실패:', error)
      toast({
        variant: 'destructive',
        title: '처치 내역 업데이트에 실패했습니다',
        description: '다시 시도해주세요.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    isSubmitting,
    upsertTx,
    upsertMultipleTx,
  }
}
