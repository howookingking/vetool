'use no memo'

import TxImageField from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/tx/detail-insert-step/images/tx-image-field'
import TxLog from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/tx/detail-insert-step/tx-log'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import useUpsertTx from '@/hooks/use-upsert-tx'
import { txDetailRegisterFormSchema } from '@/lib/schemas/icu/chart/tx-schema'
import { deleteIcuChartTx } from '@/lib/services/icu/chart/tx-mutation'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { useTxMutationStore } from '@/lib/store/icu/tx-mutation'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { LoaderCircle } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { type ImageUrlResponse } from '@/types/images'
import { useEffect, useState } from 'react'

export default function TxDetailInsertStep({
  showTxUser,
}: {
  showTxUser: boolean
}) {
  const { hos_id } = useParams()

  const { selectedTxPendingQueue, reset: orderQueueReset } = useIcuOrderStore()
  const {
    setTxStep,
    txLocalState,
    setTxLocalState,
    setIsDeleting,
    reset: txLocalStateReset,
  } = useTxMutationStore()
  const { isSubmitting, upsertTx, upsertMultipleTx } = useUpsertTx({
    hosId: hos_id as string,
    onSuccess: () => {
      setTxStep('closed')
      txLocalStateReset()
      orderQueueReset()
    },
  })

  const [bucketImages, setBucketImages] = useState<ImageUrlResponse[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof txDetailRegisterFormSchema>>({
    resolver: zodResolver(txDetailRegisterFormSchema),
    defaultValues: {
      result: txLocalState?.txResult ?? '',
      comment: txLocalState?.txComment ?? '',
      isCrucialChecked: txLocalState?.isCrucialChecked ?? false,
    },
  })

  const hasTxOrder = selectedTxPendingQueue.some((order) => order.txId)
  const hasTxLog = txLocalState?.txLog && txLocalState?.txLog?.length > 0

  useEffect(() => {
    if (!txLocalState?.txId) return

    const fetchImages = async () => {
      setIsLoading(true)

      const response = await fetch(
        `/api/image?prefix=icu-${txLocalState?.txId}`,
      )
      const data = await response.json()
      setBucketImages(data.urls)
      setTxLocalState({
        ...txLocalState,
        bucketImagesLength: data.urls?.length || 0,
      })

      setIsLoading(false)
    }

    fetchImages()

    return () => setBucketImages([])

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txLocalState?.txId, setTxLocalState])

  const handleSubmit = async (
    values: z.infer<typeof txDetailRegisterFormSchema>,
  ) => {
    if (showTxUser) {
      setTxLocalState({
        txResult: values.result,
        txComment: values.comment,
        isCrucialChecked: values.isCrucialChecked,
      })

      setTxStep('selectUser')
    } else {
      let updatedLogs = txLocalState?.txLog ?? []

      if (values?.result && values.result.trim() !== '') {
        const newLog = {
          result: values.result,
          name: '-',
          createdAt: format(new Date(), 'yyyy-MM-dd HH:mm'),
        }

        updatedLogs = [...updatedLogs, newLog]
      }

      // 다중 Tx 입력
      if (selectedTxPendingQueue.length) {
        await upsertMultipleTx(selectedTxPendingQueue, {
          result: values.result,
          comment: values.comment,
          isCrucialChecked: values.isCrucialChecked,
          orderName: txLocalState?.icuChartOrderName,
          orderType: txLocalState?.icuChartOrderType,
          updatedLogs,
          txImages: txLocalState?.txImages,
          bucketImagesLength: txLocalState?.bucketImagesLength,
        })
        return
      }

      // 단일 Tx 입력
      await upsertTx(
        {
          ...txLocalState,
          txResult: values.result,
          txComment: values.comment,
          isCrucialChecked: values.isCrucialChecked,
        },
        updatedLogs,
      )
    }
  }

  const handleCloseClick = () => {
    setTxStep('closed')
    txLocalStateReset()
    orderQueueReset()
  }

  const handleDeleteTx = async () => {
    setIsDeleting(true)
    setTxStep('closed')

    if (hasTxOrder) {
      selectedTxPendingQueue.forEach(async (order) => {
        if (order.txId) {
          await deleteIcuChartTx(order.txId)

          const key = `icu-${order.txId}`
          await fetch(`/api/image?key=${key}`, {
            method: 'DELETE',
          })
        }
      })
    } else {
      await deleteIcuChartTx(txLocalState?.txId!)

      if (bucketImages.length) {
        const key = `icu-${txLocalState?.txId}`
        await fetch(`/api/image?key=${key}`, {
          method: 'DELETE',
        })
      }
    }

    toast({
      title: '처치내역을 삭제하였습니다',
    })

    txLocalStateReset()
    orderQueueReset()
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>처치 상세 입력</DialogTitle>
        <DialogDescription />
      </DialogHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="result"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="">처치 결과</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="h-8 text-sm"
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="">코멘트</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="h-8 text-sm"
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <TxImageField
            txLocalState={txLocalState}
            setTxLocalState={setTxLocalState}
            bucketImages={bucketImages}
            setBucketImages={setBucketImages}
            isLoading={isLoading}
          />

          {hasTxLog && <TxLog logs={txLocalState?.txLog} />}

          <FormField
            control={form.control}
            name="isCrucialChecked"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="notification"
                    name="notification"
                  />
                </FormControl>
                <div className="">
                  <FormLabel htmlFor="notification">
                    확인이 필요한 처치입니다
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

          <div className="flex justify-between">
            {(txLocalState?.txId || hasTxOrder) && (
              <Button
                variant="destructive"
                onClick={handleDeleteTx}
                tabIndex={-1}
                type="button"
              >
                삭제
              </Button>
            )}
            <div className="ml-auto flex gap-2">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseClick}
                  tabIndex={-1}
                >
                  닫기
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isSubmitting}>
                {showTxUser ? '다음' : '확인'}
                {isSubmitting && (
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  )
}
