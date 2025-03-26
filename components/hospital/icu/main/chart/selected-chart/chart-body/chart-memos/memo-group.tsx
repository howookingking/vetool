import NoResultSquirrel from '@/components/common/no-result-squirrel'
import MemoColorPicker from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-memos/memo-color-picker'
import SingleMemo from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-memos/single-memo/single-memo'
import { Label } from '@/components/ui/label'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { MEMO_COLORS } from '@/constants/hospital/icu/chart/colors'
import { updateMemos } from '@/lib/services/icu/chart/update-icu-chart-infos'
import type { Memo, MemoColor, MemoGroup } from '@/types/icu/chart'
import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react'
import { ReactSortable, type Sortable } from 'react-sortablejs'
import { type NewMemoAddedTo } from './chart-memos'

type Props = {
  memo: Memo[]
  memos: MemoGroup
  setMemos: Dispatch<SetStateAction<MemoGroup>>
  memoId: keyof MemoGroup
  icuIoId: string
  memoName: string
  newMemoAddedTo: NewMemoAddedTo
  isMemoNameSetting?: boolean
}

export default function MemoGroup({
  memo,
  memos,
  setMemos,
  memoId,
  icuIoId,
  memoName,
  newMemoAddedTo,
  isMemoNameSetting,
}: Props) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [sortedMemos, setSortedMemos] = useState<Memo[]>(memo ?? [])
  const [memoInput, setMemoInput] = useState('')
  const [memoColor, setMemoColor] = useState<MemoColor>(MEMO_COLORS[0])
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false)
  const [shouldScrollToTop, setShouldScrollToTop] = useState(false)
  const lastMemoRef = useRef<HTMLLIElement>(null)
  const firstMemoRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    setSortedMemos(memo ?? [])
  }, [memo])

  useEffect(() => {
    if (shouldScrollToBottom && lastMemoRef.current) {
      lastMemoRef.current.scrollIntoView({ behavior: 'smooth' })
      setShouldScrollToBottom(false)
    }
    if (shouldScrollToTop && firstMemoRef.current) {
      firstMemoRef.current.scrollIntoView({ behavior: 'smooth' })
      setShouldScrollToTop(false)
    }
  }, [sortedMemos, shouldScrollToBottom, shouldScrollToTop])

  const handleUpdateDbMemo = async (updatedMemos: Memo[]) => {
    setIsUpdating(true)

    const newMemos = {
      ...memos,
      [memoId]: updatedMemos,
    }

    setMemos(newMemos)

    await updateMemos(
      {
        [`memo_${memoId}`]: updatedMemos,
      },
      icuIoId,
    )

    setIsUpdating(false)
  }

  const handleReorderMemo = async (event: Sortable.SortableEvent) => {
    const { from, to, oldIndex, newIndex } = event
    const isSameGroup = from === to

    // CASE A. 같은 메모 그룹 내 순서 변경인 경우
    if (isSameGroup) {
      const newOrder = [...sortedMemos]
      const [movedItem] = newOrder.splice(oldIndex as number, 1)
      newOrder.splice(newIndex as number, 0, movedItem)

      setSortedMemos(newOrder)
      await handleUpdateDbMemo(newOrder)
    } else {
      // CASE B. 다른 메모 그룹 간 변경인 경우
      const fromMemoId = from.id as 'a' | 'b' | 'c'
      const toMemoId = to.id as 'a' | 'b' | 'c'
      const movedMemo = sortedMemos[oldIndex as number]

      const updatedFromMemos = memos[fromMemoId].filter(
        (memo) => memo.id !== movedMemo.id,
      )

      const updatedToMemos = [
        ...memos[toMemoId].slice(0, newIndex as number),
        movedMemo,
        ...memos[toMemoId].slice(newIndex as number),
      ]

      setMemos({
        ...memos,
        [fromMemoId]: updatedFromMemos,
        [toMemoId]: updatedToMemos,
      })

      await updateMemos(
        {
          [`memo_${fromMemoId}`]: updatedFromMemos,
          [`memo_${toMemoId}`]: updatedToMemos,
        },
        icuIoId,
      )
    }
  }

  // 1. 메모 추가
  const handleAddMemo = async () => {
    if (memoInput.trim() === '') return

    const createdAt = new Date().toISOString()

    const newMemo: Memo = {
      id: createdAt,
      memo: memoInput.trim(),
      create_timestamp: createdAt,
      edit_timestamp: null,
      color: memoColor as MemoColor,
    }

    const updatedMemos =
      newMemoAddedTo === 'top'
        ? [newMemo, ...sortedMemos]
        : [...sortedMemos, newMemo]

    setSortedMemos(updatedMemos)
    setMemoInput('')

    await handleUpdateDbMemo(updatedMemos)

    setShouldScrollToBottom(newMemoAddedTo === 'bottom')
    setShouldScrollToTop(newMemoAddedTo === 'top')

    toast({
      title: `${memoName}에 새 메모를 추가했습니다`,
    })
  }

  // 2. 메모 수정
  const handleEditMemo = async (editedMemo: Memo, memoIndex: number) => {
    const editedMemos = sortedMemos.map((memo, index) =>
      index === memoIndex
        ? { ...editedMemo, edit_timestamp: new Date().toISOString() }
        : memo,
    )

    setSortedMemos(editedMemos)

    await handleUpdateDbMemo(editedMemos)
    toast({
      title: `메모가 수정되었습니다`,
    })
  }

  // 3. 메모 삭제
  const handleDeleteMemo = async (entryIndex: number) => {
    const updatedEntries = sortedMemos.filter(
      (_, index) => index !== entryIndex,
    )
    setSortedMemos(updatedEntries)

    await handleUpdateDbMemo(updatedEntries)
    toast({
      title: `메모가 삭제되었습니다`,
    })
  }

  return (
    <div className="relative flex w-full flex-col">
      <Label
        className="mb-1 ml-2 text-xs text-muted-foreground"
        htmlFor={`memo-${memoId}`}
      >
        {memoName} ({sortedMemos.length})
      </Label>

      <ScrollArea className="h-60 rounded-t-md border p-2">
        <ReactSortable
          id={memoId}
          list={sortedMemos}
          setList={setSortedMemos}
          className="space-y-2"
          animation={250}
          handle=".handle"
          onEnd={handleReorderMemo}
          group="memo"
          disabled={isUpdating || isMemoNameSetting}
        >
          {sortedMemos.length === 0 ? (
            <NoResultSquirrel text="메모 없음" size="sm" className="h-52" />
          ) : (
            sortedMemos.map((memo, index) => (
              <SingleMemo
                isMemoNameSetting={isMemoNameSetting}
                key={memo.id}
                memo={memo}
                memoIndex={index}
                handleEditMemo={handleEditMemo}
                onDelete={() => handleDeleteMemo(index)}
                ref={
                  index === sortedMemos.length - 1
                    ? lastMemoRef
                    : index === 0
                      ? firstMemoRef
                      : null
                }
              />
            ))
          )}
        </ReactSortable>
        <ScrollBar orientation="vertical" />
      </ScrollArea>

      <div className="relative">
        <Textarea
          disabled={isUpdating || isMemoNameSetting}
          placeholder="Shift + Enter를 눌러 줄을 추가할 수 있습니다"
          id={`memo-${memoId}`}
          value={memoInput}
          onChange={(e) => setMemoInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleAddMemo()
            }
          }}
          className="w-full rounded-none rounded-b-md border-t-0 pr-7 text-sm placeholder:text-xs"
        />

        <MemoColorPicker memoColor={memoColor} setMemoColor={setMemoColor} />
      </div>
    </div>
  )
}
