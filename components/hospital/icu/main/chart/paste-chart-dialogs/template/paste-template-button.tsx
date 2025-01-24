import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { pasteTemplateOrders } from '@/lib/services/icu/chart/order-mutation'
import { pasteChart } from '@/lib/services/icu/chart/paste-chart'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import { Check, LoaderCircle } from 'lucide-react'
import { useParams } from 'next/navigation'
import { type Dispatch, type SetStateAction, useState } from 'react'

type PasteTemplateButtonProps = {
  templateChartId: string
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
  tableHeader?: boolean // 이미 차트가 생성된 후 템플릿 오더를 추가하는 경우
  chartId?: string
}

export default function PasteTemplateButton({
  templateChartId,
  setIsDialogOpen,
  tableHeader,
  chartId,
}: PasteTemplateButtonProps) {
  const { target_date, patient_id } = useParams()

  const {
    basicHosData: { vetsListData },
  } = useBasicHosDataContext()

  const [isLoading, setIsLoading] = useState(false)

  const handlePasteSelectedTemplate = async () => {
    setIsLoading(true)

    // tableHeader : 이미 생성된 차트에서 템플릿오더를 추가
    // !tableHeader : 익일차트 혹은 첫차트에서 템플릿 오더를 추가하는 경우
    tableHeader
      ? await pasteTemplateOrders(templateChartId, chartId!)
      : await pasteChart(
          patient_id as string,
          templateChartId,
          target_date as string,
          vetsListData[0].name,
        )

    toast({
      title: '템플릿 오더를 붙여넣었습니다',
    })

    setIsLoading(false)
    setIsDialogOpen(false)
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
