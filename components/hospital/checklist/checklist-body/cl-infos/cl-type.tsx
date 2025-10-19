'use client'

import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CHECKLIST_TYPES } from '@/constants/checklist/checklist'
import { updateClType } from '@/lib/services/checklist/update-checklist'
import { TestTubeDiagonalIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

type Props = {
  type: string
  checklistId: string
}

export default function ClType({ type, checklistId }: Props) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [typeInput, setTypeInput] = useState(type)

  const handleUpdateUrgency = async (value: string) => {
    setIsUpdating(true)

    await updateClType(checklistId, value)

    setTypeInput(value)

    toast.success('체크리스트타입을 변경했습니다')

    setIsUpdating(false)
  }

  useEffect(() => {
    setTypeInput(type)
  }, [type])

  return (
    <div className="relative flex items-center">
      <Label
        className="absolute left-2 text-xs text-muted-foreground"
        htmlFor="type"
      >
        <TestTubeDiagonalIcon size={16} className="text-muted-foreground" />
      </Label>

      <Select
        value={typeInput !== null ? String(typeInput) : ''}
        onValueChange={handleUpdateUrgency}
        disabled={isUpdating}
      >
        <SelectTrigger className="w-full pl-8" showCaret={false}>
          <SelectValue placeholder="체크리스트타입">{typeInput}</SelectValue>
        </SelectTrigger>

        <SelectContent>
          {CHECKLIST_TYPES.map((type) => (
            <SelectItem key={type} value={type}>
              <div className="flex items-center gap-0.5">{type}</div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
