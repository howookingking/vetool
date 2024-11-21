'use client'

import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { updatePatientMovement } from '@/lib/services/icu/out-and-visit/update-checklist'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ChecklistInput({
  icuIoId,
  value,
  checkType,
  isDischarged,
  visitId,
}: {
  icuIoId: string
  value: string
  checkType: string
  isDischarged: boolean
  visitId?: string
}) {
  const [inputValue, setInputValue] = useState(value)
  const { refresh } = useRouter()

  useEffect(() => {
    setInputValue(value)
  }, [value])

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (value.length <= 50) setInputValue(value)
  }

  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const target = e.currentTarget
      setTimeout(() => {
        target.blur()
      }, 0)
    }
  }

  const handleUpdateChecklist = async () => {
    if (value === inputValue) return

    await updatePatientMovement(icuIoId, inputValue.trim(), checkType, visitId)

    toast({
      title: '관리 사항을 변경하였습니다',
    })
    refresh()
  }

  useEffect(() => {
    setInputValue(value)
  }, [value])

  return (
    <Input
      disabled={isDischarged}
      value={inputValue}
      onChange={handleValueChange}
      onBlur={handleUpdateChecklist}
      onKeyDown={handlePressEnter}
      className="truncate"
    />
  )
}
