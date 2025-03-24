import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { updateHosDrugName } from '@/lib/services/admin/icu/hos-drugs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type Props = {
  hosDrugName: string
  hosDrugId: string
}

export default function HosDrugNameColumn({ hosDrugId, hosDrugName }: Props) {
  const { refresh } = useRouter()

  const [hosDrugNameInput, setHosDrugNameInput] = useState(hosDrugName)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    setHosDrugNameInput(hosDrugName)
  }, [hosDrugName])

  const handleUpdateHosDrugName = async () => {
    if (
      hosDrugName === hosDrugNameInput.trim() ||
      hosDrugNameInput.trim() === ''
    ) {
      setHosDrugNameInput(hosDrugName)
      return
    }

    setIsUpdating(true)

    await updateHosDrugName(hosDrugNameInput.trim(), hosDrugId)

    toast({
      title: '약물명이 변경되었습니다',
    })
    setIsUpdating(false)
    refresh()
  }

  return (
    <Input
      className="w-full"
      value={hosDrugNameInput ?? ''}
      onChange={(e) => setHosDrugNameInput(e.target.value)}
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
