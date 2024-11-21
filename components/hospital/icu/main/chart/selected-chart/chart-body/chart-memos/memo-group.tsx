import NoResultSquirrel from '@/components/common/no-result-squirrel'
import SingleMemo from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-memos/single-memo/single-memo'
import { Label } from '@/components/ui/label'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { updateMemos } from '@/lib/services/icu/chart/update-icu-chart-infos'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ReactSortable, Sortable } from 'react-sortablejs'
import { type Memo, MEMO_COLORS } from './chart-memos'
import MemoColorPicker from './memo-color-picker'

export default function MemoGroup({
  memo,
  memoIndex,
  icuChartId,
  memoName,
}: {
  memo: Memo[] | null
  memoIndex: number
  icuChartId: string
  memoName: string
}) {
  const [sortedMemos, setSortedMemos] = useState<Memo[]>(memo ?? [])
  const [memoInput, setMemoInput] = useState('')
  const [memoColor, setMemoColor] = useState<string>(MEMO_COLORS[0])
  const [isUpdating, setIsUpdating] = useState(false)
  const lastMemoRef = useRef<HTMLLIElement>(null)
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false)

  useEffect(() => {
    setSortedMemos(memo ?? [])
  }, [memo])

  useEffect(() => {
    if (shouldScrollToBottom && lastMemoRef.current) {
      lastMemoRef.current.scrollIntoView({ behavior: 'smooth' })
      setShouldScrollToBottom(false)
    }
  }, [sortedMemos, shouldScrollToBottom])

  const handleUpdateDbMemo = useCallback(
    async (updatedMemos: Memo[]) => {
      setIsUpdating(true)

      let updateMemoQuery = {}

      switch (memoIndex) {
        case 0:
          updateMemoQuery = { memo_a: updatedMemos }
          break
        case 1:
          updateMemoQuery = { memo_b: updatedMemos }
          break
        case 2:
          updateMemoQuery = { memo_c: updatedMemos }
          break
      }

      await updateMemos(updateMemoQuery, icuChartId)
      setIsUpdating(false)
    },
    [icuChartId, memoIndex],
  )

  const handleAddMemo = useCallback(async () => {
    if (memoInput.trim() === '') return

    const createdAt = new Date().toISOString()

    const newMemo: Memo = {
      id: createdAt,
      memo: memoInput.trim(),
      create_timestamp: createdAt,
      edit_timestamp: null,
      color: memoColor,
    }

    const updatedMemos = [...sortedMemos, newMemo]
    setSortedMemos(updatedMemos)

    setMemoInput('')

    await handleUpdateDbMemo(updatedMemos)

    setShouldScrollToBottom(true)

    toast({
      title: `${memoName}에 새 메모를 추가했습니다`,
    })
  }, [
    handleUpdateDbMemo,
    memoColor,
    memoInput,
    memoName,
    sortedMemos,
    setMemoInput,
  ])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleAddMemo()
      }
    },
    [handleAddMemo],
  )

  const handleEditMemo = useCallback(
    async (editedMemo: Memo, memoIndex: number) => {
      const editedMemos = sortedMemos.map((memo, index) =>
        index === memoIndex
          ? {
              ...editedMemo,
              edit_timestamp: new Date().toISOString(),
            }
          : memo,
      )
      setSortedMemos(editedMemos)

      await handleUpdateDbMemo(editedMemos)

      toast({
        title: `메모가 수정되었습니다`,
      })
    },
    [handleUpdateDbMemo, sortedMemos],
  )

  const handleDeleteMemo = useCallback(
    async (entryIndex: number) => {
      const updatedEntries = sortedMemos.filter(
        (_, index) => index !== entryIndex,
      )
      setSortedMemos(updatedEntries)

      await handleUpdateDbMemo(updatedEntries)
      toast({
        title: `메모가 삭제되었습니다`,
      })
    },
    [handleUpdateDbMemo, sortedMemos],
  )

  const handleReorder = useCallback(
    async (event: Sortable.SortableEvent) => {
      let newOrder = [...sortedMemos]
      const [movedItem] = newOrder.splice(event.oldIndex as number, 1)
      newOrder.splice(event.newIndex as number, 0, movedItem)

      setSortedMemos(newOrder)
      await handleUpdateDbMemo(newOrder)
    },
    [sortedMemos, handleUpdateDbMemo],
  )
  return (
    <div className="relative flex w-full flex-col gap-1">
      <Label
        className="ml-2 text-xs text-muted-foreground"
        htmlFor={`memo-${memoIndex}`}
      >
        {memoName} ({sortedMemos.length})
      </Label>

      <ScrollArea className="h-60 rounded-md border p-2">
        <ReactSortable
          list={sortedMemos}
          setList={setSortedMemos}
          className="space-y-2"
          animation={250}
          handle=".handle"
          onEnd={handleReorder}
        >
          {sortedMemos.length === 0 ? (
            <NoResultSquirrel text="메모 없음" size="sm" className="h-52" />
          ) : (
            sortedMemos.map((memo, index) => (
              <SingleMemo
                key={memo.id}
                memo={memo}
                memoIndex={index}
                handleEditMemo={handleEditMemo}
                onDelete={() => handleDeleteMemo(index)}
                ref={index === sortedMemos.length - 1 ? lastMemoRef : null}
              />
            ))
          )}
        </ReactSortable>
        <ScrollBar orientation="vertical" />
      </ScrollArea>

      <div className="relative">
        <Textarea
          disabled={isUpdating}
          placeholder="Shift + Enter를 눌러 줄을 추가할 수 있습니다"
          id={`memo-${memoIndex}`}
          value={memoInput}
          onChange={(e) => setMemoInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full pr-7 text-sm placeholder:text-xs"
        />

        <MemoColorPicker memoColor={memoColor} setMemoColor={setMemoColor} />
      </div>
    </div>
  )
}
