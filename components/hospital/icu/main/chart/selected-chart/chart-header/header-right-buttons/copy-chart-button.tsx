'use client'

import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { useCopiedChartStore } from '@/lib/store/icu/copied-chart'
import { Copy, CopyCheck } from 'lucide-react'

export default function CopyChartButton({
  icuChartId,
}: {
  icuChartId: string
}) {
  const { copiedChartId, setCopiedChartId } = useCopiedChartStore()

  const handleCopy = async () => {
    setCopiedChartId(icuChartId)

    toast({
      title: '차트 복사 완료',
      description: '붙여넣기를 실행할 빈 차트로 이동해주세요',
    })
  }

  return (
    <Button variant="ghost" size="icon" onClick={handleCopy}>
      {copiedChartId === icuChartId ? (
        <CopyCheck size={18} />
      ) : (
        <Copy size={18} />
      )}
    </Button>
  )
}
