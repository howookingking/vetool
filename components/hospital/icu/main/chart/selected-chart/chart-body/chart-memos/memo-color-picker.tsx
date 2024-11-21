'use client'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Check } from 'lucide-react'
import { Dispatch, SetStateAction, useState } from 'react'
import { MEMO_COLORS } from './chart-memos'

export default function MemoColorPicker({
  memoColor,
  setMemoColor,
}: {
  memoColor: string
  setMemoColor: Dispatch<SetStateAction<string>>
}) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const handleSelectColor = (color: string) => {
    setMemoColor(color)
    setIsPopoverOpen(false)
  }

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild className="absolute right-1.5 top-1.5">
        <Button
          variant="outline"
          className="h-5 w-5 rounded-md border-2 border-white p-0 shadow-none"
          style={{ backgroundColor: memoColor }}
        />
      </PopoverTrigger>
      <PopoverContent className="w-32 p-1" side="top">
        <div className="grid grid-cols-5 gap-1">
          {MEMO_COLORS.map((color) => (
            <Button
              key={color}
              variant="outline"
              className="h-5 w-5 rounded-md p-0"
              style={{ backgroundColor: color }}
              onClick={() => handleSelectColor(color)}
            >
              {memoColor === color && <Check className="h-4 w-4 text-white" />}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
