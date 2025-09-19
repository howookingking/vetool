'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { updateOwnerName } from '@/lib/services/icu/chart/update-icu-chart-infos'
import { UserIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

type Props = {
  ownerName: string
  patientId: string
}

export default function OwnerName({ ownerName, patientId }: Props) {
  const [ownerNameInput, setOwnerNameInput] = useState(ownerName)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleUpdateOwnerName = async () => {
    if (ownerName === ownerNameInput.trim()) {
      setOwnerNameInput(ownerNameInput.trim())
      return
    }

    setIsUpdating(true)
    await updateOwnerName(patientId, ownerNameInput.trim())

    toast.success('보호자명을 변경하였습니다')

    setIsUpdating(false)
  }

  useEffect(() => {
    setOwnerNameInput(ownerName)
  }, [ownerName])

  return (
    <div className="relative flex items-center">
      <Label
        className="absolute left-2 text-xs text-muted-foreground"
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
        onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
        className="w-full pl-8"
        title={ownerName ?? '미등록'}
      />
    </div>
  )
}
