'use client'

import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { updatePatientMovement } from '@/lib/services/icu/out-and-visit/update-checklist'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ChecklistTime({
  icuIoId,
  time,
  checkType,
  isDischarged,
  visitId,
}: {
  icuIoId: string
  time: string
  checkType: string
  isDischarged: boolean
  visitId?: string
}) {
  const [timeInput, setTimeInput] = useState(time)
  const { refresh } = useRouter()

  useEffect(() => {
    setTimeInput(time)
  }, [time])

  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur()
    }
  }

  const handleUpdateChecklist = async () => {
    if (time === timeInput) return

    await updatePatientMovement(icuIoId, timeInput, checkType, visitId)

    toast({
      title: '관리 사항을 변경하였습니다',
    })
    refresh()
  }

  return (
    <div className="flex justify-center">
      <Input
        type="time"
        disabled={isDischarged}
        value={timeInput}
        onChange={(e) => setTimeInput(e.target.value)}
        onBlur={handleUpdateChecklist}
        onKeyDown={handlePressEnter}
        className="w-[120px]"
      />
    </div>
  )
}
