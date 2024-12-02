'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { updateCage } from '@/lib/services/icu/chart/update-icu-chart-infos'
import { SquarePlus } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Cage({
  cage,
  icuIoId,
}: {
  cage: string
  icuIoId: string
}) {
  const [cageInput, setCageInput] = useState(cage)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleUpdateOwnerName = async () => {
    if (cage === cageInput.trim()) {
      setCageInput(cageInput.trim())
      return
    }

    setIsUpdating(true)
    await updateCage(icuIoId, cageInput.trim())

    toast({
      title: '입원장을 변경하였습니다',
    })

    setIsUpdating(false)
  }

  useEffect(() => {
    setCageInput(cage)
  }, [cage])

  return (
    <div className="relative flex items-center">
      <Label
        className="absolute left-2 text-xs text-muted-foreground"
        htmlFor="cage"
      >
        <SquarePlus size={16} className="text-muted-foreground" />
      </Label>

      <Input
        placeholder="입원장"
        disabled={isUpdating}
        id="cage"
        value={cageInput}
        onChange={(e) => setCageInput(e.target.value)}
        onBlur={handleUpdateOwnerName}
        onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
        className="w-full truncate pl-8"
        title={cage ?? '미등록'}
      />
    </div>
  )
}
