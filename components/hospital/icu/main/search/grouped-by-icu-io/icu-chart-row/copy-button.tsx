import { Button } from '@/components/ui/button'
import { useCopiedChartStore } from '@/lib/store/icu/copied-chart'
import { ClipboardCheckIcon, ClipboardIcon } from 'lucide-react'
import { toast } from 'sonner'

export default function CopyButton({ chartId }: { chartId: string }) {
  const { setCopiedChartId, copiedChartId } = useCopiedChartStore()

  const handleCopy = async () => {
    setCopiedChartId(chartId)

    toast.success('차트를 복사하였습니다', {
      description: '붙여넣기를 실행할 빈 차트로 이동해주세요',
    })
  }

  return (
    <Button
      onClick={handleCopy}
      size="icon"
      variant="ghost"
      className="mx-auto flex items-center justify-center"
    >
      {copiedChartId === chartId ? <ClipboardCheckIcon /> : <ClipboardIcon />}
    </Button>
  )
}
