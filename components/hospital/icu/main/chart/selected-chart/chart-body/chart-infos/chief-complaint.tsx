'use client'

import Autocomplete from '@/components/common/auto-complete/auto-complete'
import { updateChiefComplaint } from '@/lib/services/icu/chart/update-icu-chart-infos'
import { useState } from 'react'
import { toast } from 'sonner'

type Props = {
  chiefComplaint: string
  icuIoId: string
  isShare?: boolean
}

export default function ChiefComplaint({
  chiefComplaint,
  icuIoId,
  isShare,
}: Props) {
  const [isUpdating, setIsUpdating] = useState(false)

  const handleUpdateChiefComplaint = async (value: string) => {
    const trimmedValue = value.trim()

    if (chiefComplaint === trimmedValue) {
      return
    }

    setIsUpdating(true)

    await updateChiefComplaint(icuIoId, trimmedValue)

    toast.success('주증상을 변경하였습니다')

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
