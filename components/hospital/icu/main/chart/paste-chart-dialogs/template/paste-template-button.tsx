import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { pasteChart } from '@/lib/services/icu/chart/paste-chart'
import { useCopiedChartStore } from '@/lib/store/icu/copied-chart'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import { Check, LoaderCircle } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'

export default function PasteTemplateButton({ chartId }: { chartId: string }) {
  const { target_date, patient_id } = useParams()

  const { reset } = useCopiedChartStore()
  const {
    basicHosData: { vetsListData },
  } = useBasicHosDataContext()

  const [isLoading, setIsLoading] = useState(false)

  const handlePasteSelectedTemplate = async () => {
    setIsLoading(true)

    await pasteChart(
      patient_id as string,
      chartId!,
      target_date as string,
      vetsListData[0].name,
    )

    toast({
      title: '차트를 생성하였습니다',
    })

    setIsLoading(false)
    reset()
  }

  return (
    <Button size="icon" onClick={handlePasteSelectedTemplate} variant="ghost">
      {isLoading ? (
        <LoaderCircle className="animate-spin" />
      ) : (
        <Check size={16} />
      )}
    </Button>
  )
}
