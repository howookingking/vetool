import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { Check, Pencil } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { type Memo, MEMO_COLORS } from '../chart-memos'
import MemoColorPicker from '../memo-color-picker'
import DeleteMemoDialog from './delete-memo-dialog'
import MemoTimeStamp from './memo-time-stamp'

type SingleMemoProps = {
  memo: Memo
  onDelete: () => void
  handleEditMemo: (editedMemo: Memo, memoIndex: number) => Promise<void>
  memoIndex: number
}

const SingleMemo = React.forwardRef<HTMLLIElement, SingleMemoProps>(
  ({ memo, onDelete, handleEditMemo, memoIndex }, ref) => {
    const [isEditMode, setIsEditMode] = useState(false)
    const editingTextAreaRef = useRef<HTMLTextAreaElement>(null)

    const [editedMemo, setEditedMemo] = useState(memo.memo)
    const [editedMemoColor, setEditedMemoColor] = useState(memo.color)
    const [editedCreateTimestamp, setEditedCreateTimestamp] = useState(
      memo.create_timestamp,
    )

    useEffect(() => {
      if (isEditMode && editingTextAreaRef.current) {
        const textarea = editingTextAreaRef.current
        textarea.style.height = 'auto'
        textarea.style.height = `${textarea.scrollHeight + 20}px`
      }
    }, [isEditMode, editedMemo])

    useEffect(() => {
      setEditedMemo(memo.memo)
      setEditedMemoColor(memo.color)
      setEditedCreateTimestamp(memo.create_timestamp)
    }, [memo])

    const handleUpdateSingleMemo = () => {
      if (editedMemo.trim().length === 0) {
        toast({
          title: '메모를 입력해주세요',
        })
        editingTextAreaRef.current?.focus()
        return
      }
      handleEditMemo(
        {
          ...memo,
          memo: editedMemo.trim(),
          color: editedMemoColor,
          create_timestamp: editedCreateTimestamp,
          edit_timestamp: new Date().toISOString(),
        },
        memoIndex,
      )
      setIsEditMode(false)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleUpdateSingleMemo()
      }
    }

    return (
      <li
        ref={ref}
        className="handle group relative flex cursor-grab gap-2 rounded-sm p-2 pt-1"
        style={{
          backgroundColor: editedMemoColor ?? MEMO_COLORS[0],
        }}
      >
        <div className="flex w-full flex-col gap-1">
          <div className="flex items-center justify-between">
            <MemoTimeStamp
              editedCreateTimestamp={editedCreateTimestamp}
              isEditMode={isEditMode}
              setEditedCreateTimestamp={setEditedCreateTimestamp}
              editTimestamp={memo.edit_timestamp}
            />

            {!isEditMode && (
              <div className="absolute right-1.5 top-1.5 flex cursor-pointer items-center gap-2 text-muted-foreground opacity-0 transition duration-300 group-hover:opacity-100 group-focus:opacity-100">
                <Pencil
                  size={14}
                  onClick={() => setIsEditMode(true)}
                  className="hover:opacity-70"
                />

                <DeleteMemoDialog onDelete={onDelete} />
              </div>
            )}
          </div>

          {isEditMode ? (
            <div className="relative">
              <Textarea
                value={editedMemo}
                onChange={(e) => setEditedMemo(e.target.value)}
                className="min-h-8 overflow-hidden px-1 py-0.5 pr-7 text-sm"
                ref={editingTextAreaRef}
                onKeyDown={handleKeyDown}
              />
              <MemoColorPicker
                memoColor={editedMemoColor}
                setMemoColor={setEditedMemoColor}
              />
              <Check
                size={14}
                onClick={handleUpdateSingleMemo}
                className="absolute -top-5 right-0 cursor-pointer hover:opacity-70"
              />
            </div>
          ) : (
            <p className="mr-2 whitespace-pre-wrap break-all text-sm">
              {memo.memo}
            </p>
          )}
        </div>
      </li>
    )
  },
)

SingleMemo.displayName = 'SingleMemo'

export default SingleMemo
