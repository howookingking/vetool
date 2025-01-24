'use client'

import Autocomplete from '@/components/common/auto-complete/auto-complete'
import { toast } from '@/components/ui/use-toast'
import { updateDiagnosis } from '@/lib/services/icu/chart/update-icu-chart-infos'
import { useState } from 'react'

export default function Diagnosis({
  diagnosis,
  icuIoId,
  isShare,
}: {
  diagnosis: string
  icuIoId: string
  isShare?: boolean
}) {
  const [isUpdating, setIsUpdating] = useState(false)

  const handleUpdateDiagnosis = async (value: string) => {
    const trimmedValue = value.trim()

    if (diagnosis === trimmedValue) {
      return
    }

    setIsUpdating(true)

    await updateDiagnosis(icuIoId, trimmedValue)

    toast({
      title: '진단명을 변경하였습니다',
    })

    setIsUpdating(false)
  }

  return (
    <Autocomplete
      label="DX"
      handleUpdate={handleUpdateDiagnosis}
      defaultValue={diagnosis}
      isUpdating={isUpdating}
      isShare={isShare}
    />
  )
}
