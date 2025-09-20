import { Input } from '@/components/ui/input'
import { updateCaution } from '@/lib/services/admin/icu/hos-drugs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

type Props = {
  caution: string
  hosDrugId: string
}

export default function CautionColumn({ hosDrugId, caution }: Props) {
  const { refresh } = useRouter()

  const [cautionInput, setCautionInput] = useState(caution)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    setCautionInput(caution)
  }, [caution])

  const handleUpdateHosDrugName = async () => {
    if (caution === cautionInput.trim()) {
      setCautionInput(caution)
      return
    }

    setIsUpdating(true)

    await updateCaution(cautionInput, hosDrugId)

    toast.success('주사 특이사항을 변경하였습니다')

    setIsUpdating(false)
    refresh()
  }

  return (
    <Input
      value={cautionInput ?? ''}
      onChange={(e) => setCautionInput(e.target.value)}
      onBlur={handleUpdateHosDrugName}
      disabled={isUpdating}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          if (e.nativeEvent.isComposing) return

          const target = e.currentTarget
          if (target) {
            target.blur()
          }
        }
      }}
    />
  )
}
