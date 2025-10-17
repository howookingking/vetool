'use client'

import HideAndShowButton from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-memos/hide-and-show-button'
import type { TxMemo } from '@/types/checklist/checklist-type'
import { useEffect, useState } from 'react'
import ClTxMemoGroup from './cl-tx-memo-group'

export type NewMemoAddedTo = 'top' | 'bottom'

type Props = {
  txMemoA: TxMemo[] | null
  txMemoB: TxMemo[] | null
  checklistId: string
}

export default function ClTxMemos({ checklistId, txMemoA, txMemoB }: Props) {
  const [showMemos, setShowMemos] = useState(true)

  const [memos, setMemos] = useState({
    a: txMemoA ?? [],
    b: txMemoB ?? [],
  })

  useEffect(() => {
    setMemos({
      a: txMemoA ?? [],
      b: txMemoB ?? [],
    })
  }, [txMemoA, txMemoB])

  return (
    <div className="relative">
      {showMemos && (
        <div className="grid grid-cols-2 gap-2">
          <ClTxMemoGroup
            memo={memos.a}
            memos={memos}
            setMemos={setMemos}
            memoId="a"
            checklistId={checklistId}
            memoName="처치정보"
          />

          <ClTxMemoGroup
            memo={memos.b}
            memos={memos}
            setMemos={setMemos}
            memoId="b"
            checklistId={checklistId}
            memoName="주의사항"
          />
        </div>
      )}

      <HideAndShowButton setShowMemos={setShowMemos} showMemos={showMemos} />
    </div>
  )
}
