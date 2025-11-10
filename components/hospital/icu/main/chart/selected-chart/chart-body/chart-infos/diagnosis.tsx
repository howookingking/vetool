'use client'

import Autocomplete from '@/components/common/auto-complete/auto-complete'
import { useSafeRefresh } from '@/hooks/use-realtime-refresh'
import { updateDiagnosis } from '@/lib/services/icu/chart/update-icu-chart-infos'
import { useState } from 'react'
import { toast } from 'sonner'

type Props = {
  diagnosis: string
  icuIoId: string
  isShare?: boolean
}

export default function Diagnosis({ diagnosis, icuIoId, isShare }: Props) {
  const safeRefresh = useSafeRefresh()

  const [isUpdating, setIsUpdating] = useState(false)

  const handleUpdateDiagnosis = async (value: string) => {
    const trimmedValue = value.trim()

    if (diagnosis === trimmedValue) {
      return
    }

    setIsUpdating(true)

    await updateDiagnosis(icuIoId, trimmedValue)

    toast.success('진단명을 변경하였습니다')

    setIsUpdating(false)

    safeRefresh()
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
