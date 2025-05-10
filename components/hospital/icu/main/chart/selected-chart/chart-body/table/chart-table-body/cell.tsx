import { TxDetailHover } from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/tx/tx-detail-hover'
import { VitalResultIndication } from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/tx/vital-result-indication'
import { Input } from '@/components/ui/input'
import { TableCell } from '@/components/ui/table'
import { toast } from '@/components/ui/use-toast'
import useAbnormalVital from '@/hooks/use-abnormal-vital'
import useCellAutofocus from '@/hooks/use-cell-autofocus'
import { useLongPress } from '@/hooks/use-long-press'
import useUpsertTx from '@/hooks/use-upsert-tx'
import { OrderTimePendingQueue } from '@/lib/store/icu/icu-order'
import { TxLocalState } from '@/lib/store/icu/icu-tx'
import { cn } from '@/lib/utils/utils'
import type { Treatment, TxLog } from '@/types/icu/chart'
import { format } from 'date-fns'
import { Image as ImageIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'

type Props = {
  time: number
  hosId: string
  treatment?: Treatment
  icuChartOrderId: string
  isDone: boolean
  icuChartTxId?: string
  preview?: boolean
  orderer: string
  orderType: string
  orderName: string
  toggleOrderTime: (orderId: string, time: number) => void
  showOrderer: boolean
  showTxUser: boolean
  isGuidelineTime: boolean
  setSelectedTxPendingQueue: (
    updater:
      | OrderTimePendingQueue[]
      | ((prev: OrderTimePendingQueue[]) => OrderTimePendingQueue[]),
  ) => void
  isMutationCanceled: boolean
  setIsMutationCanceled: (isMutationCanceled: boolean) => void
  setTxStep: (txStep: 'closed' | 'detailInsert' | 'selectUser') => void
  setTxLocalState: (updates: Partial<TxLocalState>) => void
  orderTimePendingQueueLength: number
  rowVitalRefRange:
    | {
        min: number
        max: number
      }
    | undefined
  hasOrder: boolean
  hasComment: boolean
  isInPendingQueue: boolean
  isInOrderTimePendingQueue: boolean
}

export default function Cell({
  hosId,
  time,
  treatment,
  icuChartOrderId,
  isDone,
  icuChartTxId,
  preview,
  orderer,
  orderType,
  orderName,
  toggleOrderTime,
  showOrderer,
  showTxUser,
  isGuidelineTime,
  setSelectedTxPendingQueue,
  isMutationCanceled,
  setIsMutationCanceled,
  setTxStep,
  setTxLocalState,
  orderTimePendingQueueLength,
  rowVitalRefRange,
  hasComment,
  hasOrder,
  isInPendingQueue,
  isInOrderTimePendingQueue,
}: Props) {
  const { upsertTx, isSubmitting } = useUpsertTx({ hosId })
  const { calcVitalResult, isAbnormalVital } = useAbnormalVital(
    treatment,
    rowVitalRefRange,
  )
  useCellAutofocus()

  const [briefTxResultInput, setBriefTxResultInput] = useState('')

  useEffect(() => {
    if (treatment?.tx_result || isMutationCanceled) {
      setBriefTxResultInput('')
      setIsMutationCanceled(false)
    }
  }, [isMutationCanceled, treatment?.tx_result, setIsMutationCanceled])

  const handleOpenTxDetail = () => {
    setTxLocalState({
      icuChartOrderId,
      icuChartOrderType: orderType,
      icuChartOrderName: orderName,
      txResult: treatment?.tx_result,
      txComment: treatment?.tx_comment,
      txId: icuChartTxId,
      time,
      txLog: treatment?.tx_log as TxLog[] | null,
      isCrucialChecked: treatment?.is_crucial,
    })
    setTxStep('detailInsert')
  }

  const longPressProps = useLongPress({
    onLongPress: handleOpenTxDetail,
    onClick: () => toggleCellInQueue(icuChartOrderId, time),
    threshold: 500,
  })

  const toggleCellInQueue = (orderId: string, time: number) => {
    if (orderTimePendingQueueLength > 0) return

    setSelectedTxPendingQueue((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.orderId === orderId && item.orderTime === time,
      )
      if (existingIndex !== -1) {
        return prev.filter((_, index) => index !== existingIndex)
      } else {
        return [
          ...prev,
          {
            txId: icuChartTxId,
            orderId,
            orderTime: time,
            txLog: treatment?.tx_log as TxLog[] | null,
            isCrucialChecked: treatment?.is_crucial,
          },
        ]
      }
    })

    setTxLocalState({
      icuChartOrderId,
      icuChartOrderType: orderType,
      icuChartOrderName: orderName,
    })
  }

  const handleUpsertBriefTxResult = async () => {
    // 아무것도 입력하지 않은 경우
    if (briefTxResultInput.trim() === '') {
      setBriefTxResultInput('')
      return
    }

    // 기존 처치 결과와 동일한 경우
    if ((treatment?.tx_result ?? '') === briefTxResultInput.trim()) {
      setBriefTxResultInput('')
      return
    }

    const [trimmedTxResult, trimmedTxComment] = briefTxResultInput
      .split('$')
      .map((item) => item.trim())

    const txData = {
      icuChartOrderId,
      icuChartOrderType: orderType,
      icuChartOrderName: orderName,
      time,
      txResult: trimmedTxResult,
      txComment: trimmedTxComment ?? '',
      txId: icuChartTxId,
      txLog: treatment?.tx_log as TxLog[] | null,
    }

    if (showTxUser) {
      setTxLocalState(txData)
      setTxStep('selectUser')
    } else {
      let updatedLogs = txData.txLog ?? []

      const newLog = {
        result: trimmedTxResult,
        name: '-',
        createdAt: format(new Date(), 'yyyy-MM-dd HH:mm'),
      }

      updatedLogs = [...updatedLogs, newLog]

      await upsertTx(txData, updatedLogs)

      toast({
        title: '처치 내역이 업데이트 되었습니다',
      })
    }
  }

  const handleRightClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.metaKey || e.ctrlKey) {
      e.currentTarget.blur()
      toggleOrderTime(icuChartOrderId, time)
    }
  }

  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const target = e.currentTarget
      setTimeout(() => target?.blur(), 0)
    }
  }

  return (
    <TableCell className="handle group p-0">
      <div
        className={cn(
          briefTxResultInput.length > 0
            ? '[&:focus-within_.tx-result-overlay]:opacity-20'
            : '[&:focus-within_.tx-result-overlay]:opacity-50',
          'relative [&:focus-within_.tx-result-overlay]:overflow-visible',
        )}
      >
        <Input
          id={`${icuChartOrderId}&${time}`}
          className={cn(
            isGuidelineTime && 'bg-amber-300/10',
            hasOrder && 'bg-rose-400/10',
            hasOrder && isInOrderTimePendingQueue && 'bg-transparent',
            isDone &&
              !isInOrderTimePendingQueue &&
              !isInPendingQueue &&
              'bg-emerald-400/10',
            !hasOrder && isInOrderTimePendingQueue && 'bg-rose-400/10',
            isDone && isInPendingQueue && 'bg-emerald-400/40',
            !isDone && isInPendingQueue && 'bg-cyan-400/10',

            'h-11 min-w-12 rounded-none border-none px-1 text-center ring-inset focus-visible:ring-2 md:min-w-0',
          )}
          disabled={preview || isSubmitting}
          value={briefTxResultInput}
          onChange={(e) => setBriefTxResultInput(e.target.value)}
          onBlur={handleUpsertBriefTxResult}
          onKeyDown={handlePressEnter}
          onContextMenu={handleRightClick}
          aria-label="처치 결과 입력"
          {...longPressProps}
        />

        <span className="tx-result-overlay absolute inset-0 -z-10 flex items-center justify-center overflow-hidden whitespace-pre group-hover:overflow-visible">
          {treatment?.tx_result ?? ''}
        </span>

        {hasOrder && showOrderer && (
          <div
            className={cn(
              'absolute bottom-0.5 right-0.5 -z-10 text-[10px] leading-none text-muted-foreground',
            )}
          >
            {orderer}
          </div>
        )}

        {hasComment && <TxDetailHover txComment={treatment?.tx_comment} />}

        {isAbnormalVital && (
          <VitalResultIndication
            result={calcVitalResult as 'below' | 'above'}
          />
        )}

        {treatment?.is_crucial && (
          <span className="absolute bottom-0 left-0 text-[10px]">❗️</span>
        )}

        {treatment?.has_images && (
          <ImageIcon
            size={14}
            strokeWidth={2}
            className="absolute right-0.5 top-0.5 text-pink-500"
          />
        )}
      </div>
    </TableCell>
  )
}
