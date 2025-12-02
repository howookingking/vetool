'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { updateOwnerName } from '@/lib/services/icu/chart/update-icu-chart-infos'
import { handleSafeEnterBlur } from '@/lib/utils/utils'
import { UserIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

type Props = {
  ownerName: string
  patientId: string
}

export default function OwnerName({ ownerName, patientId }: Props) {
  const { refresh } = useRouter()

  const [ownerNameInput, setOwnerNameInput] = useState(ownerName)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleUpdateOwnerName = async () => {
    if (ownerName === ownerNameInput.trim()) return

    setIsUpdating(true)
    await updateOwnerName(patientId, ownerNameInput.trim())

    toast.success('보호자명을 변경하였습니다')

    setIsUpdating(false)
    refresh()
    // 보호자명의 경우 실시간 table(patients) 구독이 되어있지 않아서 refresh가 필요
    // 또한 다른 컴퓨터에서 실시간 반영되지 않음
    // 이런게 몇개 있음 (환자 정보) 다만 체중은 icu_chart 테이블에 있어서 실시간임
  }

  useEffect(() => {
    setOwnerNameInput(ownerName)
  }, [ownerName])

  return (
    <div className="relative">
      <Label
        className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground"
        htmlFor="ownerName"
      >
        <UserIcon size={16} className="text-muted-foreground" />
      </Label>
      <Input
        placeholder="보호자"
        disabled={isUpdating}
        id="ownerName"
        value={ownerNameInput}
        onChange={(e) => setOwnerNameInput(e.target.value)}
        onBlur={handleUpdateOwnerName}
        onKeyDown={handleSafeEnterBlur}
        className="w-full pl-8"
      />
    </div>
  )
}
