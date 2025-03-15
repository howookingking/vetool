import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { updateMlPerKg } from '@/lib/services/admin/icu/hos-drugs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type Props = {
  mlPerKg: string
  hosDrugId: string
}

export default function MlPerKgColumn({ hosDrugId, mlPerKg }: Props) {
  const { refresh } = useRouter()

  const [mlPerKgInput, setMlPerKgInput] = useState(mlPerKg)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    setMlPerKgInput(mlPerKg)
  }, [mlPerKg])

  const handleUpdateMlPerKg = async () => {
    if (mlPerKg === mlPerKgInput.trim() || mlPerKgInput.trim() === '') {
      setMlPerKgInput(mlPerKg)
      return
    }

    if (isNaN(Number(mlPerKgInput))) {
      toast({
        variant: 'destructive',
        title: '숫자를 입력해주세요',
      })
      setMlPerKgInput(mlPerKg)
      return
    }
    setIsUpdating(true)

    await updateMlPerKg(mlPerKgInput, hosDrugId)

    toast({
      title: '체중당 투여량(ml/kg)이 변경되었습니다',
    })
    setIsUpdating(false)
    refresh()
  }

  return (
    <Input
      className="w-20"
      value={mlPerKgInput ?? ''}
      onChange={(e) => setMlPerKgInput(e.target.value)}
      onBlur={handleUpdateMlPerKg}
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
