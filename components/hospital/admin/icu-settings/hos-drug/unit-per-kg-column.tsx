import { Input } from '@/components/ui/input'
import { updateUnitPerKg } from '@/lib/services/admin/icu/hos-drugs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

type Props = {
  unitPerKg: string
  hosDrugId: string
  unit: string
}

export default function UnitPerKgColumn({ hosDrugId, unitPerKg, unit }: Props) {
  const { refresh } = useRouter()

  const [unitPerKgInput, setUnitPerKgInput] = useState(unitPerKg)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    setUnitPerKgInput(unitPerKg)
  }, [unitPerKg])

  const handleUpdateUnitPerKg = async () => {
    if (unitPerKg === unitPerKgInput.trim() || unitPerKgInput.trim() === '') {
      setUnitPerKgInput(unitPerKg)
      return
    }

    if (isNaN(Number(unitPerKgInput))) {
      toast.warning('숫자를 입력해주세요')

      setUnitPerKgInput(unitPerKg)
      return
    }

    setIsUpdating(true)

    await updateUnitPerKg(unitPerKgInput, hosDrugId)

    toast.success('기본용량을 변경하였습니다')

    setIsUpdating(false)
    refresh()
  }

  return (
    <div className="relative">
      <Input
        className="w-24"
        value={unitPerKgInput ?? ''}
        onChange={(e) => setUnitPerKgInput(e.target.value)}
        onBlur={handleUpdateUnitPerKg}
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
      <span className="absolute bottom-2.5 right-1.5 text-xs text-muted-foreground">
        {unit}/kg
      </span>
    </div>
  )
}
