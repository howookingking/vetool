import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import useShorcutKey from '@/hooks/use-shortcut-key'
import { useCopiedChartStore } from '@/lib/store/icu/copied-chart'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { Copy, CopyCheck } from 'lucide-react'
import { useCallback } from 'react'

export default function CopyChartButton({
  icuChartId,
}: {
  icuChartId: string
}) {
  const { copiedChartId, setCopiedChartId } = useCopiedChartStore()
  const { selectedOrderPendingQueue } = useIcuOrderStore()

  const handleCopy = useCallback(async () => {
    setCopiedChartId(icuChartId)
    toast({
      title: '차트 복사 완료',
      description: '붙여넣기 할 차트로 이동해주세요',
    })
  }, [icuChartId, setCopiedChartId])

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
