'use client'

import HideAndShowButton from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-memos/hide-and-show-button'
import MemoGroup from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-memos/memo-group'
import SortMemoButton from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-memos/sort-memo-button'
import useLocalStorage from '@/hooks/use-local-storage'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import { type Memo } from '@/types/icu/chart'
import { useState } from 'react'

type Props = {
  memoA: Memo[] | null
  memoB: Memo[] | null
  memoC: Memo[] | null
  icuIoId: string
}

export default function ChartMemos({ memoA, memoB, memoC, icuIoId }: Props) {
  const {
    basicHosData: { memoNameListData },
  } = useBasicHosDataContext()

  const [showMemos, setShowMemos] = useState(true)
  const [sortMemoMethod, setSortMemoMethod] = useLocalStorage('sort', 'desc')
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
            sortMemoMethod={sortMemoMethod}
          />

          <MemoGroup
            memo={memos.b}
            memos={memos}
            setMemos={setMemos}
            memoId="b"
            icuIoId={icuIoId}
            memoName={memoNameListData[1]}
            sortMemoMethod={sortMemoMethod}
          />

          <MemoGroup
            memo={memos.c}
            memos={memos}
            setMemos={setMemos}
            memoId="c"
            icuIoId={icuIoId}
            memoName={memoNameListData[2]}
            sortMemoMethod={sortMemoMethod}
          />
        </div>
      )}

      <SortMemoButton
        sortMemoMethod={sortMemoMethod}
        setSortMemoMethod={setSortMemoMethod}
      />
      <HideAndShowButton setShowMemos={setShowMemos} showMemos={showMemos} />
    </div>
  )
}
