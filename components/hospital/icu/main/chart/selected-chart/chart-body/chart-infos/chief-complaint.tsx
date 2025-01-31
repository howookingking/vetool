'use client'

import Autocomplete from '@/components/common/auto-complete/auto-complete'
import { toast } from '@/components/ui/use-toast'
import { updateChiefComplaint } from '@/lib/services/icu/chart/update-icu-chart-infos'
import { useState } from 'react'

export default function ChiefComplaint({
  chiefComplaint,
  icuIoId,
  isShare,
}: {
  chiefComplaint: string
  icuIoId: string
  isShare?: boolean
}) {
  const [isUpdating, setIsUpdating] = useState(false)

  const handleUpdateChiefComplaint = async (value: string) => {
    const trimmedValue = value.trim()

    if (chiefComplaint === trimmedValue) {
      return
    }

    setIsUpdating(true)

    await updateChiefComplaint(icuIoId, trimmedValue)

    toast({
      title: '주증상을 변경하였습니다',
    })

    setIsUpdating(false)
  }

  return (
    <Autocomplete
      label="CC"
      defaultValue={chiefComplaint}
      handleUpdate={handleUpdateChiefComplaint}
      isUpdating={isUpdating}
      isShare={isShare}
    />
  )
}
