import { Button } from '@/components/ui/button'
import { useCopiedChartStore } from '@/lib/store/icu/copied-chart'
import { Copy, CopyCheck, LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export default function CopyButton({ chartId }: { chartId: string }) {
  const { setCopiedChartId, copiedChartId } = useCopiedChartStore()
  const [isCopying, setIsCopying] = useState(false)

  const handleCopy = async () => {
    setIsCopying(true)
    setCopiedChartId(chartId)

    toast.success('차트를 복사하였습니다', {
      description: '붙여넣기를 실행할 빈 차트로 이동해주세요',
    })

    setIsCopying(false)
  }

  return (
    <Button
      onClick={handleCopy}
      disabled={isCopying}
      size="icon"
      variant="ghost"
      className="mx-auto flex items-center justify-center"
    >
      {isCopying ? (
        <LoaderCircle size={18} className="animate-spin" />
      ) : (
        <>
          {copiedChartId === chartId ? (
            <CopyCheck size={18} />
          ) : (
            <Copy size={18} />
          )}
        </>
      )}
    </Button>
  )
}
