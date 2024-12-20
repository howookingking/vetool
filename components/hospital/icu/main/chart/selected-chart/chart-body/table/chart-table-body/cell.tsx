import { TxDetailHover } from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/tx/tx-detail-hover'
import { VitalResultIndication } from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/tx/vital-result-indication'
import { Input } from '@/components/ui/input'
import { TableCell } from '@/components/ui/table'
import useAbnormalVital from '@/hooks/use-abnormal-vital'
import useCellAutofocus from '@/hooks/use-cell-autofocus'
import { useLongPress } from '@/hooks/use-long-press'
import { OrderTimePendingQueue } from '@/lib/store/icu/icu-order'
import { TxLocalState } from '@/lib/store/icu/tx-mutation'
import { cn } from '@/lib/utils/utils'
import type { SelectedIcuOrder, Treatment, TxLog } from '@/types/icu/chart'
import React, { useCallback, useEffect, useState } from 'react'

type CellProps = {
  // isHovered: boolean
  // onMouseEnter: (columnIndex: number) => void
  // onMouseLeave: () => void
  time: number
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
  isGuidelineTime: boolean
  setSelectedTxPendingQueue: (
    updater:
      | OrderTimePendingQueue[]
      | ((prev: OrderTimePendingQueue[]) => OrderTimePendingQueue[]),
  ) => void
  isMutationCanceled: boolean
  setIsMutationCanceled: (isMutationCanceled: boolean) => void
  setTxStep: (txStep: 'closed' | 'detailInsert' | 'seletctUser') => void
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
}

export default function Cell({
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
}: CellProps) {
  const [briefTxResultInput, setBriefTxResultInput] = useState('')
  const { calcVitalResult, isAbnormalVital } = useAbnormalVital(
    treatment,
    rowVitalRefRange,
  )
  useCellAutofocus()

  useEffect(() => {
    if (treatment?.tx_result || isMutationCanceled) {
      setBriefTxResultInput('')
      setIsMutationCanceled(false)
    }
  }, [isMutationCanceled, treatment?.tx_result, setIsMutationCanceled])

  const handleOpenTxDetail = useCallback(() => {
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
  }, [
    icuChartOrderId,
    icuChartTxId,
    setTxStep,
    setTxLocalState,
    time,
    treatment?.tx_comment,
    treatment?.tx_log,
    treatment?.tx_result,
    orderType,
    orderName,
    treatment?.is_crucial,
  ])
  const longPressProps = useLongPress({
    onLongPress: handleOpenTxDetail,
    onClick: () => toggleCellInQueue(icuChartOrderId, time),
  })

  const toggleCellInQueue = useCallback(
    (orderId: string, time: number) => {
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
            },
          ]
        }
      })
    },
    [
      setSelectedTxPendingQueue,
      icuChartTxId,
      treatment?.tx_log,
      orderTimePendingQueueLength,
    ],
  )

  const handleUpsertBriefTxResult = useCallback(async () => {
    if ((treatment?.tx_result ?? '') === briefTxResultInput.trim()) {
      setBriefTxResultInput('')
      return
    }
    if (icuChartTxId && briefTxResultInput.trim() === '') {
      setBriefTxResultInput('')
      return
    }
    setTxLocalState({
      icuChartOrderId,
      icuChartOrderType: orderType,
      icuChartOrderName: orderName,
      time,
      txResult: briefTxResultInput.replace(/^"|"$/g, '').trim(),
      txId: icuChartTxId,
      txLog: treatment?.tx_log as TxLog[] | null,
    })

    setTxStep('seletctUser')
  }, [
    briefTxResultInput,
    icuChartOrderId,
    icuChartTxId,
    setTxStep,
    setTxLocalState,
    time,
    treatment?.tx_result,
    treatment?.tx_log,
    orderType,
    orderName,
  ])

  const handleRightClick = useCallback(
    (e: React.MouseEvent<HTMLInputElement>) => {
      e.preventDefault()
      if (e.metaKey || e.ctrlKey) {
        e.currentTarget.blur()
        toggleOrderTime(icuChartOrderId, time)
      }
    },
    [icuChartOrderId, time, toggleOrderTime],
  )

  const handleEnterPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        const target = e.currentTarget
        setTimeout(() => target?.blur(), 0)
      }
    },
    [],
  )

  return (
    <TableCell className="handle p-0">
      <div className="relative [&:focus-within_.tx-result-overlay]:opacity-20">
        <Input
          id={`${icuChartOrderId}&${time}`}
          className={cn(
            isGuidelineTime && 'bg-amber-300/10',
            // isHovered && 'bg-muted/50',
            hasOrder && 'bg-rose-400/10',
            isDone && 'bg-emerald-400/10',
            isInPendingQueue && 'ring-2 ring-primary',
            'h-11 rounded-none border-none px-1 text-center outline-none ring-inset focus-visible:ring-2 focus-visible:ring-primary',
          )}
          disabled={preview}
          value={briefTxResultInput}
          onChange={(e) => setBriefTxResultInput(e.target.value)}
          onBlur={handleUpsertBriefTxResult}
          onKeyDown={handleEnterPress}
          onContextMenu={handleRightClick}
          {...longPressProps}
        />
        <span className="tx-result-overlay absolute inset-0 -z-10 flex items-center justify-center truncate">
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
      </div>
    </TableCell>
  )
}
