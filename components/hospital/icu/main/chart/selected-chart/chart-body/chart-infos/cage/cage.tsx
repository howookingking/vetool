'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useSafeRefresh } from '@/hooks/use-realtime-refresh'
import { updateCage } from '@/lib/services/icu/chart/update-icu-chart-infos'
import { SquarePlusIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

type Props = {
  icuIoId: string
  cage: string
}

export default function Cage({ cage, icuIoId }: Props) {
  const safeRefresh = useSafeRefresh()

  const [cageInput, setCageInput] = useState(cage)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleUpdateCage = async () => {
    if (cage === cageInput.trim()) {
      setCageInput(cageInput.trim())
      return
    }

    setIsUpdating(true)
    await updateCage(icuIoId, cageInput.trim())

    toast.success('입원장을 변경하였습니다')

    setIsUpdating(false)
    safeRefresh()
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
        <SquarePlusIcon size={16} className="text-muted-foreground" />
      </Label>

      <Input
        placeholder="입원장"
        disabled={isUpdating}
        id="cage"
        value={cageInput}
        onChange={(e) => setCageInput(e.target.value)}
        onBlur={handleUpdateCage}
        onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
        className="w-full truncate pl-8"
        title={cage ?? '미등록'}
      />
    </div>
  )
}
