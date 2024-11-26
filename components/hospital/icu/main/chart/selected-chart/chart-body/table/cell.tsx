import { TxDetailHover } from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/tx/tx-detail-hover'
import { VitalResultIndication } from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/tx/vital-result-indication'
import { Input } from '@/components/ui/input'
import { TableCell } from '@/components/ui/table'
import useAbnormalVital from '@/hooks/use-abnormal-vital'
import { OrderTimePendingQueue } from '@/lib/store/icu/icu-order'
import { TxLocalState } from '@/lib/store/icu/tx-mutation'
import { cn } from '@/lib/utils/utils'
import type { SelectedIcuOrder, Treatment, TxLog } from '@/types/icu/chart'
import { useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const LONGPRESS_TIMEOUT = 600

type CellProps = {
  time: number
  treatment?: Treatment
  icuChartOrderId: string
  isDone: boolean
  icuChartTxId?: string
  preview?: boolean
  orderer: string
  toggleOrderTime: (orderId: string, time: number) => void
  showOrderer: boolean
  isHovered: boolean
  onMouseEnter: (columnIndex: number) => void
  onMouseLeave: () => void
  isGuidelineTime: boolean
  setSelectedTxPendingQueue: (
    updater:
      | OrderTimePendingQueue[]
      | ((prev: OrderTimePendingQueue[]) => OrderTimePendingQueue[]),
  ) => void
  selectedTxPendingQueue: OrderTimePendingQueue[]
  isMutationCanceled: boolean
  setIsMutationCanceled: (isMutationCanceled: boolean) => void
  setTxStep: (txStep: 'closed' | 'detailInsert' | 'seletctUser') => void
  setTxLocalState: (updates: Partial<TxLocalState>) => void
  setSelectedOrderPendingQueue: (
    updater:
      | Partial<SelectedIcuOrder>[]
      | ((prev: Partial<SelectedIcuOrder>[]) => Partial<SelectedIcuOrder>[]),
  ) => void
  orderTimePendingQueueLength: number
  rowVitalRefRange:
    | {
        min: number
        max: number
      }
    | undefined
}

export default function Cell({
  time,
  treatment,
  icuChartOrderId,
  isDone,
  icuChartTxId,
  preview,
  orderer,
  toggleOrderTime,
  showOrderer,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  isGuidelineTime,
  selectedTxPendingQueue,
  setSelectedTxPendingQueue,
  isMutationCanceled,
  setIsMutationCanceled,
  setTxStep,
  setTxLocalState,
  setSelectedOrderPendingQueue,
  orderTimePendingQueueLength,
  rowVitalRefRange,
}: CellProps) {
  const [briefTxResultInput, setBriefTxResultInput] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const pressTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const mouseDownTimeRef = useRef<number>(0)
  const isLongPressRef = useRef(false)
  const touchStartTimeRef = useRef<number>(0)
  const isTouchEventRef = useRef(false)
  const { calcVitalResult, isAbnormalVital } = useAbnormalVital(
    treatment,
    rowVitalRefRange,
  )

  const hasOrder = useMemo(() => orderer !== '0', [orderer])
  const hasComment = useMemo(
    () => !!treatment?.tx_comment,
    [treatment?.tx_comment],
  )
  const isInPendingQueue = useMemo(
    () =>
      selectedTxPendingQueue.some(
        (item) => item.orderId === icuChartOrderId && item.orderTime === time,
      ),
    [icuChartOrderId, selectedTxPendingQueue, time],
  )

  useEffect(() => {
    if (treatment?.tx_result || isMutationCanceled) {
      setBriefTxResultInput('')
      setIsMutationCanceled(false)
    }
  }, [isMutationCanceled, setIsMutationCanceled, treatment?.tx_result])

  const cleanupPressTimeout = useCallback(() => {
    // 타이머가 있다면 취소 및 참조 제거
    if (pressTimeoutRef.current) {
      clearTimeout(pressTimeoutRef.current)
      pressTimeoutRef.current = null
    }

    // 상태 초기화
    isLongPressRef.current = false
    setIsFocused(false)
  }, [])

  // 컴포넌트 언마운트 시 클린업
  useEffect(() => {
    return () => {
      cleanupPressTimeout()
    }
  }, [cleanupPressTimeout])

  const handleOpenTxDetail = useCallback(() => {
    setTxLocalState({
      icuChartOrderId,
      txResult: treatment?.tx_result,
      txComment: treatment?.tx_comment,
      txId: icuChartTxId,
      time,
      txLog: treatment?.tx_log as TxLog[] | null,
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
  ])

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

  const handleTouchStart = useCallback(() => {
    isTouchEventRef.current = true
    setSelectedOrderPendingQueue([])

    touchStartTimeRef.current = Date.now()

    pressTimeoutRef.current = setTimeout(() => {
      isLongPressRef.current = true
      handleOpenTxDetail()
    }, 800)
  }, [handleOpenTxDetail, setSelectedOrderPendingQueue])

  const handleTouchEnd = useCallback(() => {
    const pressDuration = Date.now() - touchStartTimeRef.current

    if (!isLongPressRef.current && pressDuration < 800) {
      setIsFocused(true)
    }

    cleanupPressTimeout()
    isTouchEventRef.current = false
  }, [cleanupPressTimeout])

  const handleTouchMove = useCallback(() => {
    cleanupPressTimeout()
  }, [cleanupPressTimeout])

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLInputElement>) => {
      // 우클릭무시
      if (e.button === 2) return
      // Order Pending Queue Reset
      setSelectedOrderPendingQueue([])

      mouseDownTimeRef.current = Date.now()

      // 0.8s 동안 마우스를 누르고 있으면 LongPress
      pressTimeoutRef.current = setTimeout(() => {
        isLongPressRef.current = true
        // 처치 상세 입력
        handleOpenTxDetail()
      }, LONGPRESS_TIMEOUT)
    },
    [handleOpenTxDetail, setSelectedOrderPendingQueue],
  )

  const handleMouseUp = useCallback(
    (e: React.MouseEvent<HTMLInputElement>) => {
      if (e.button === 2) return

      // Mouse Down 시간 게산
      const pressDuration = Date.now() - mouseDownTimeRef.current
      cleanupPressTimeout()

      // LongPress가 아닌 경우
      if (!isLongPressRef.current && pressDuration < LONGPRESS_TIMEOUT) {
        // 셀 다중 선택인 경우
        if (e.metaKey || e.ctrlKey) {
          e.currentTarget.blur()
          toggleCellInQueue(icuChartOrderId, time)
        }
        setIsFocused(true)
      }
    },
    [cleanupPressTimeout, icuChartOrderId, time, toggleCellInQueue],
  )

  const handleMouseLeave = useCallback(() => {
    cleanupPressTimeout()
    onMouseLeave()
  }, [cleanupPressTimeout, onMouseLeave])

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

  const handleUpsertBriefTxResultInput = useCallback(async () => {
    if ((treatment?.tx_result ?? '') === briefTxResultInput.trim()) {
      setBriefTxResultInput('')
      return
    }
    if (icuChartTxId && briefTxResultInput.trim() === '') {
      setBriefTxResultInput('')
      return
    }
    setTxLocalState({
      time,
      txResult: briefTxResultInput.replace(/^"|"$/g, '').trim(),
      icuChartOrderId,
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
  ])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        const target = e.currentTarget
        setTimeout(() => {
          if (target) {
            target.blur()
          }
        }, 0)
      }
    },
    [],
  )

  // 처치표에서부터 이동시 해당 셀 포커싱
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  useEffect(() => {
    const orderId = params.get('order-id')
    const orderTime = params.get('time')
    const cellInputId = document.getElementById(`${orderId}&${orderTime}`)
    if (cellInputId) cellInputId.focus()
  }, [params])

  return (
    <TableCell className="handle p-0">
      <div className="relative overflow-hidden">
        <Input
          id={`${icuChartOrderId}&${time}`}
          className={cn(
            isGuidelineTime && 'bg-amber-300/10',
            isHovered && 'bg-muted/50',
            hasOrder && 'bg-rose-400/10',
            isDone && 'bg-emerald-400/10',
            isInPendingQueue && 'ring-2',
            'h-11 rounded-none border-none px-1 text-center outline-none ring-inset focus-visible:ring-2 focus-visible:ring-primary',
          )}
          disabled={preview}
          value={briefTxResultInput}
          onChange={(e) => setBriefTxResultInput(e.target.value)}
          onBlur={() => {
            setIsFocused(false)
            handleUpsertBriefTxResultInput()
          }}
          onKeyDown={handleKeyDown}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onContextMenu={handleRightClick}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={() => onMouseEnter(time)}
          onFocus={() => setIsFocused(true)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
        />
        <div
          className={cn(
            'absolute inset-0 -z-10 flex items-center justify-center',
            isFocused && 'opacity-20',
          )}
        >
          {treatment?.tx_result ?? ''}
        </div>

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
      </div>
    </TableCell>
  )
}
