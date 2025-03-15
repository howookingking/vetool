import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { updateMgPerKg } from '@/lib/services/admin/icu/hos-drugs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type Props = {
  mgPerKg: string
  hosDrugId: string
}

export default function MgPerKgColumn({ hosDrugId, mgPerKg }: Props) {
  const { refresh } = useRouter()

  const [mgPerKgInput, setMgPerKgInput] = useState(mgPerKg)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    setMgPerKgInput(mgPerKg)
  }, [mgPerKg])

  const handleUpdateMgPerKg = async () => {
    if (mgPerKg === mgPerKgInput.trim() || mgPerKgInput.trim() === '') {
      setMgPerKgInput(mgPerKg)
      return
    }

    if (isNaN(Number(mgPerKgInput))) {
      toast({
        variant: 'destructive',
        title: '숫자를 입력해주세요',
      })
      setMgPerKgInput(mgPerKg)
      return
    }

    setIsUpdating(true)

    await updateMgPerKg(mgPerKgInput, hosDrugId)

    toast({
      title: '기본용량(mg/kg)이 변경되었습니다',
    })
    setIsUpdating(false)
    refresh()
  }

  return (
    <Input
      className="w-20"
      value={mgPerKgInput ?? ''}
      onChange={(e) => setMgPerKgInput(e.target.value)}
      onBlur={handleUpdateMgPerKg}
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
