import { Input } from '@/components/ui/input'
import { TableCell } from '@/components/ui/table'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { useTxMutationStore } from '@/lib/store/icu/tx-mutation'
import { cn } from '@/lib/utils'
import type { Treatment, TxLog } from '@/types/icu/chart'
import { useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { TxDetailHover } from './tx/tx-detail-hover'

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
}

const Cell: React.FC<CellProps> = React.memo(
  ({
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
  }) => {
    const [briefTxResultInput, setBriefTxResultInput] = useState('')
    const [isFocused, setIsFocused] = useState(false)
    const pressTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const mouseDownTimeRef = useRef<number>(0)
    const isLongPressRef = useRef(false)

    const { setSelectedTxPendingQueue, selectedTxPendingQueue } =
      useIcuOrderStore()
    const {
      isMutationCanceled,
      setIsMutationCanceled,
      setStep,
      setTxLocalState,
    } = useTxMutationStore()

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
      if (isFocused) return

      setTxLocalState({
        icuChartOrderId,
        txResult: treatment?.tx_result,
        txComment: treatment?.tx_comment,
        txId: icuChartTxId,
        time,
        txLog: treatment?.tx_log as TxLog[] | null,
      })

      setStep('detailInsert')
    }, [
      icuChartOrderId,
      icuChartTxId,
      setStep,
      isFocused,
      setTxLocalState,
      time,
      treatment?.tx_comment,
      treatment?.tx_log,
      treatment?.tx_result,
    ])

    const toggleCellInQueue = useCallback(
      (orderId: string, time: number) => {
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
              },
            ]
          }
        })
      },
      [setSelectedTxPendingQueue, icuChartTxId],
    )

    const handleMouseDown = useCallback(
      (e: React.MouseEvent<HTMLInputElement>) => {
        mouseDownTimeRef.current = Date.now()

        // 0.8s 동안 마우스를 누르고 있으면 LongPress
        pressTimeoutRef.current = setTimeout(() => {
          isLongPressRef.current = true
          // 처치 상세 입력
          handleOpenTxDetail()
        }, 800)
      },
      [handleOpenTxDetail],
    )

    const handleMouseUp = useCallback(
      (e: React.MouseEvent<HTMLInputElement>) => {
        // Mouse Down 시간 게산
        const pressDuration = Date.now() - mouseDownTimeRef.current
        cleanupPressTimeout()

        // LongPress가 아닌 경우
        if (!isLongPressRef.current && pressDuration < 800) {
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
        txResult: briefTxResultInput.trim(),
        icuChartOrderId,
        txId: icuChartTxId,
      })

      setStep('seletctUser')
    }, [
      briefTxResultInput,
      icuChartOrderId,
      icuChartTxId,
      setStep,
      setTxLocalState,
      time,
      treatment?.tx_result,
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

    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)
    const orderId = params.get('order-id')
    const orderTime = params.get('time')

    useEffect(() => {
      const cellInputId = document.getElementById(`${orderId}&${orderTime}`)
      if (cellInputId) cellInputId.focus()
    }, [orderId, orderTime])

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
            onMouseLeave={handleMouseLeave}
            onContextMenu={handleRightClick}
            onMouseEnter={() => onMouseEnter(time)}
            onFocus={() => setIsFocused(true)}
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
        </div>
      </TableCell>
    )
  },
)

Cell.displayName = 'Cell'

export default Cell
