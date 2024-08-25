import { Input } from '@/components/ui/input'
import { TableCell } from '@/components/ui/table'
import { useLongPress } from '@/hooks/use-long-press'
import { useTxMutationStore } from '@/lib/store/icu/tx-mutation'
import { cn } from '@/lib/utils'
import type { IcuChartTx } from '@/types'
import type { TxLog } from '@/types/icu'
import { useCallback, useEffect, useRef, useState } from 'react'
import { TxDetailHover } from './tx/tx-detail-hover'

export default function ChartTableCell({
  time,
  txData,
  icuIoId,
  icuChartOrderId,
  hasOrder,
  isDone,
  icuChartTxId,
  preview,
}: {
  time: number
  txData: IcuChartTx | null
  icuIoId: string
  icuChartOrderId: string
  hasOrder: boolean
  isDone: boolean
  icuChartTxId?: string
  preview?: boolean
}) {
  const [briefTxResultInput, setBriefTxResultInput] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const {
    isMutationCanceled,
    setIsMutationCanceled,
    setStep,
    setTxLocalState,
  } = useTxMutationStore()
  const cellRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (txData?.icu_chart_tx_result || isMutationCanceled) {
      setBriefTxResultInput('')
      setIsMutationCanceled(false)
    }
  }, [isMutationCanceled, setIsMutationCanceled, txData?.icu_chart_tx_result])

  // const targetedIsTxMutating = useMemo(
  //   () => isTxMutating && txLocalState?.cellId === `${icuChartOrderId}-${time}`,
  //   [icuChartOrderId, isTxMutating, time, txLocalState?.cellId],
  // )

  // const cellRef = useRef<HTMLInputElement | null>(null)

  const longPressEvents = useLongPress({
    onLongPress: () => {
      setTxLocalState({
        icuChartOrderId,
        icuIoId,
        txResult: txData?.icu_chart_tx_result,
        txComment: txData?.icu_chart_tx_comment,
        // txImages: txData?.icu_chart_tx_images,
        txId: icuChartTxId,
        time,
        txLog: txData?.icu_chart_tx_log as TxLog[] | null,
      })
      setStep('detailInsert')
    },
    // onClick: () => {
    //   setCellId(`${icuChartOrderId}-${time}`)
    // },
    delay: 600,
  })

  const handleUpsertBriefTxResultInput = useCallback(async () => {
    if ((txData?.icu_chart_tx_result ?? '') === briefTxResultInput.trim()) {
      setBriefTxResultInput('')
      return
    }

    // 수정시 길이 0인 string 방지
    if (icuChartTxId && briefTxResultInput.trim() === '') {
      setBriefTxResultInput('')
      return
    }

    // create
    if (!icuChartTxId) {
      setTxLocalState({
        time,
        txResult: briefTxResultInput.trim(),
        icuChartOrderId,
        icuIoId,
        txId: icuChartTxId,
      })
    }

    setTxLocalState({
      time,
      txResult: briefTxResultInput.trim(),
      icuChartOrderId,
      icuIoId,
      txId: icuChartTxId,
    })

    setStep('seletctUser')
  }, [
    briefTxResultInput,
    icuChartOrderId,
    icuChartTxId,
    icuIoId,
    setBriefTxResultInput,
    setStep,
    setTxLocalState,
    time,
    txData?.icu_chart_tx_result,
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

  const hasComment = !!txData?.icu_chart_tx_comment

  return (
    <TableCell className="p-0">
      {/* {targetedIsTxMutating ? (
        <div className="flex h-full items-center justify-center bg-amber-50">
          <LoaderCircle className="mx-auto animate-spin text-amber-500" />
        </div>
      ) : ( */}
      <div className="relative overflow-hidden">
        <Input
          ref={cellRef}
          id={`${icuChartOrderId}-${time}`}
          className={cn(
            'rounded-none border-none border-primary px-1 text-center outline-none ring-inset ring-primary focus-visible:ring-2 focus-visible:ring-primary',
            hasOrder && 'bg-rose-500/10',
            isDone && 'bg-emerald-400/10',
          )}
          // style={{
          //   backgroundColor:
          //     (isDone && CELL_COLORS.DONE) ||
          //     (hasOrder && CELL_COLORS.NOT_DONE) ||
          //     'transparent',
          // }}
          onFocus={() => setIsFocused(true)}
          disabled={preview}
          value={briefTxResultInput}
          onChange={(e) => setBriefTxResultInput(e.target.value)}
          onBlur={() => {
            handleUpsertBriefTxResultInput()
            setIsFocused(false)
          }}
          onKeyDown={handleKeyDown}
          {...longPressEvents}
        />

        <div
          className={cn(
            'absolute inset-0 -z-10 flex items-center justify-center text-black transition',
            isFocused && 'opacity-20',
          )}
        >
          {txData?.icu_chart_tx_result ?? ''}
        </div>

        {hasComment && (
          <TxDetailHover txComment={txData?.icu_chart_tx_comment} />
        )}
      </div>
      {/* )} */}
    </TableCell>
  )
}
