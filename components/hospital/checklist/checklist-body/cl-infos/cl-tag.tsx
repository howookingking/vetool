'use client'

import Autocomplete from '@/components/common/auto-complete/auto-complete'
import { updateClTag } from '@/lib/services/checklist/update_checklist'
import { useState } from 'react'
import { toast } from 'sonner'

type Props = {
  checklistId: string
  checklistTag: string
}

export default function ClTag({ checklistTag, checklistId }: Props) {
  const [isUpdating, setIsUpdating] = useState(false)

  const handleUpdateChiefComplaint = async (value: string) => {
    const trimmedValue = value.trim()

    if (checklistTag === trimmedValue) {
      return
    }

    setIsUpdating(true)

    await updateClTag(checklistId, trimmedValue)

    toast.success('태그를 변경하였습니다')

    setIsUpdating(false)
  }

  return (
    <Autocomplete
      label="태그"
      defaultValue={checklistTag}
      handleUpdate={handleUpdateChiefComplaint}
      isUpdating={isUpdating}
      toolTipMessage="태그는 콤마로 구분됩니다"
    />
  )
}
