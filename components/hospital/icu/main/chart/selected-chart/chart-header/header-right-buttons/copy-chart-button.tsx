'use client'

import { Button } from '@/components/ui/button'
import { useCopiedChartStore } from '@/lib/store/icu/copied-chart'
import { ClipboardCheckIcon, CopyIcon } from 'lucide-react'
import { toast } from 'sonner'

export default function CopyChartButton({
  icuChartId,
}: {
  icuChartId: string
}) {
  const { copiedChartId, setCopiedChartId } = useCopiedChartStore()

  const handleCopy = async () => {
    setCopiedChartId(icuChartId)

    toast.success('차트 복사 완료', {
      description: (
        <span>
          붙여넣기를 실행할 빈 차트로 이동해주세요
          <br />
          새로고침을 하면 클립보드에서 차트가 삭제됩니다
        </span>
      ),
    })
  }

  return (
    <Button variant="ghost" size="icon" onClick={handleCopy}>
      {copiedChartId === icuChartId ? <ClipboardCheckIcon /> : <CopyIcon />}
    </Button>
  )
}
