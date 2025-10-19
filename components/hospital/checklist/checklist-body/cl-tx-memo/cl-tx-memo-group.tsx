import NoResultSquirrel from '@/components/common/no-result-squirrel'
import MemoColorPicker from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-memos/memo-color-picker'
import { Label } from '@/components/ui/label'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { MEMO_COLORS } from '@/constants/hospital/icu/chart/colors'
import { updateTxMemos } from '@/lib/services/checklist/update-checklist'
import { TxMemo } from '@/types/checklist/checklist-type'
import type { MemoColor } from '@/types/icu/chart'
import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react'
import { ReactSortable, type Sortable } from 'react-sortablejs'
import { toast } from 'sonner'
import SingleTxMemo from './single-tx-memo'

type TxMemoGroup = {
  a: TxMemo[]
  b: TxMemo[]
}

type Props = {
  memo: TxMemo[]
  memos: TxMemoGroup
  setMemos: Dispatch<SetStateAction<TxMemoGroup>>
  memoId: keyof TxMemoGroup
  checklistId: string
  memoName: string
}

export default function ClTxMemoGroup({
  memo,
  memos,
  setMemos,
  memoId,
  checklistId,
  memoName,
}: Props) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [sortedMemos, setSortedMemos] = useState<TxMemo[]>(memo ?? [])
  const [memoInput, setMemoInput] = useState('')
  const [memoColor, setMemoColor] = useState<MemoColor>(MEMO_COLORS[0])

  const lastMemoRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    setSortedMemos(memo ?? [])
  }, [memo])

  useEffect(() => {
    if (lastMemoRef.current) {
      lastMemoRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [sortedMemos])

  const handleUpdateDbMemo = async (updatedMemos: TxMemo[]) => {
    setIsUpdating(true)

    const newMemos = {
      ...memos,
      [memoId]: updatedMemos,
    }

    setMemos(newMemos)

    await updateTxMemos(
      {
        [`tx_memo_${memoId}`]: updatedMemos,
      },
      checklistId,
    )

    setIsUpdating(false)
  }

  const handleReorderMemo = async (event: Sortable.SortableEvent) => {
    const { from, to, oldIndex, newIndex } = event

    const newOrder = [...sortedMemos]
    const [movedItem] = newOrder.splice(oldIndex as number, 1)
    newOrder.splice(newIndex as number, 0, movedItem)

    setSortedMemos(newOrder)
    await handleUpdateDbMemo(newOrder)
  }

  const handleAddMemo = async () => {
    if (memoInput.trim() === '') return

    const createdAt = new Date().toISOString()

    const newMemo: TxMemo = {
      id: createdAt,
      memo: memoInput.trim(),
      create_timestamp: createdAt,
      edit_timestamp: null,
      color: memoColor as MemoColor,
      done_time: null,
      is_done: false,
    }

    const updatedMemos = [...sortedMemos, newMemo]

    setSortedMemos(updatedMemos)
    setMemoInput('')

    await handleUpdateDbMemo(updatedMemos)

    toast.success(`${memoName}에 새 메모를 추가했습니 다`)
  }

  const handleEditMemo = async (editedMemo: TxMemo, memoIndex: number) => {
    const editedMemos = sortedMemos.map((memo, index) =>
      index === memoIndex
        ? { ...editedMemo, edit_timestamp: new Date().toISOString() }
        : memo,
    )

    setSortedMemos(editedMemos)

    await handleUpdateDbMemo(editedMemos)

    toast.success('메모를 수정하였습니다')
  }

  const handleDeleteMemo = async (entryIndex: number) => {
    const updatedEntries = sortedMemos.filter(
      (_, index) => index !== entryIndex,
    )
    setSortedMemos(updatedEntries)

    await handleUpdateDbMemo(updatedEntries)

    toast.success('메모를 삭제하였습니다')
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
          disabled={isUpdating}
        >
          {sortedMemos.length === 0 ? (
            <NoResultSquirrel
              text="메모 없음"
              size="sm"
              className="h-52 flex-col font-normal text-muted-foreground"
            />
          ) : (
            sortedMemos.map((memo, index) => (
              <SingleTxMemo
                isMemoNameSetting={false}
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
          placeholder="줄 추가 : Shift + Enter ⏎"
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
