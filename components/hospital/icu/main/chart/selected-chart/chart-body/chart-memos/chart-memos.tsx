'use client'

import HideAndShowButton from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-memos/hide-and-show-button'
import MemoGroup from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-memos/memo-group'
import NewMemoAddedToButton from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-memos/new-memo-added-to-button'
import useLocalStorage from '@/hooks/use-local-storage'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import { type Memo } from '@/types/icu/chart'
import { useState } from 'react'

export type NewMemoAddedTo = 'top' | 'bottom'

type Props = {
  memoA: Memo[] | null
  memoB: Memo[] | null
  memoC: Memo[] | null
  icuIoId: string
  isMemoNameSetting?: boolean
}

export default function ChartMemos({
  memoA,
  memoB,
  memoC,
  icuIoId,
  isMemoNameSetting = false,
}: Props) {
  const {
    basicHosData: { memoNameListData },
  } = useBasicHosDataContext()

  const [showMemos, setShowMemos] = useState(true)
  const [newMemoAddedTo, setNewMemoAddedTo] = useLocalStorage<NewMemoAddedTo>(
    'sort',
    'bottom',
  )
  const [memos, setMemos] = useState({
    a: memoA ?? [],
    b: memoB ?? [],
    c: memoC ?? [],
  })

  return (
    <div className="relative">
      {showMemos && (
        <div className="grid grid-cols-3 gap-2">
          <MemoGroup
            memo={memos.a}
            memos={memos}
            setMemos={setMemos}
            memoId="a"
            icuIoId={icuIoId}
            memoName={memoNameListData[0]}
            newMemoAddedTo={newMemoAddedTo}
            isMemoNameSetting={isMemoNameSetting}
          />

          <MemoGroup
            memo={memos.b}
            memos={memos}
            setMemos={setMemos}
            memoId="b"
            icuIoId={icuIoId}
            memoName={memoNameListData[1]}
            newMemoAddedTo={newMemoAddedTo}
            isMemoNameSetting={isMemoNameSetting}
          />

          <MemoGroup
            memo={memos.c}
            memos={memos}
            setMemos={setMemos}
            memoId="c"
            icuIoId={icuIoId}
            memoName={memoNameListData[2]}
            newMemoAddedTo={newMemoAddedTo}
            isMemoNameSetting={isMemoNameSetting}
          />
        </div>
      )}

      {!isMemoNameSetting && (
        <>
          <NewMemoAddedToButton
            newMemoAddedTo={newMemoAddedTo}
            setNewMemoAddedTo={setNewMemoAddedTo}
          />
          <HideAndShowButton
            setShowMemos={setShowMemos}
            showMemos={showMemos}
          />
        </>
      )}
    </div>
  )
}
