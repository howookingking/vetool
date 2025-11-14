'use client'

import { Textarea } from '@/components/ui/textarea'
import { OutChart } from '@/constants/hospital/icu/chart/out-and-visit'
import { useSafeRefresh } from '@/hooks/use-realtime-refresh'
import { updateOutChart } from '@/lib/services/icu/out-and-visit/icu-out-chart'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

type Props = {
  icuIoId: string
  isDischarged: boolean
  filedName: keyof OutChart
  outChart: OutChart
}

export default function OutAndVisitRowTextarea({
  icuIoId,
  isDischarged,
  filedName,
  outChart,
}: Props) {
  const filedValue = outChart?.[filedName] ?? ''

  const safeRefresh = useSafeRefresh()

  const [inputValue, setInputValue] = useState(filedValue)

  useEffect(() => {
    setInputValue(filedValue)
  }, [filedValue])

  const handleValueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value

    if (value.length <= 50) setInputValue(value)
  }

  const handlePressEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault()
      e.currentTarget.blur()
    }
  }

  const handleUpdateChecklist = async () => {
    if (filedValue === inputValue) return

    const newOutChart: OutChart = {
      ...outChart,
      [filedName]: inputValue,
    }

    await updateOutChart(icuIoId, newOutChart)

    toast.success('퇴원차트 세부사항을 변경하였습니다')

    safeRefresh()
  }

  return (
    <Textarea
      disabled={isDischarged}
      value={inputValue}
      onChange={handleValueChange}
      onBlur={handleUpdateChecklist}
      onKeyDown={handlePressEnter}
      className="min-h-10 px-1.5 py-1 placeholder:text-xs"
      rows={1}
    />
  )
}
