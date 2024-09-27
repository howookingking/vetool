import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { getSelectedChartOrders } from '@/lib/services/icu/search-charts'
import { useCopiedChartStore } from '@/lib/store/icu/copied-chart'
import { Copy, CopyCheck, LoaderCircle } from 'lucide-react'
import { useState } from 'react'

export default function CopyButton({ chartId }: { chartId: string }) {
  const { setCopiedChartId, setCopiedChart, copiedChartId } =
    useCopiedChartStore()
  const [isCopying, setIsCopying] = useState(false)

  const handleCopy = async () => {
    setIsCopying(true)

    setCopiedChartId(chartId)

    const sortedChartOrders = await getSelectedChartOrders(chartId)
    // setCopiedChart(sortedChartOrders)

    toast({
      title: '차트 복사 완료',
      description: '해당 차트가 클립보드에 복사되었습니다',
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
