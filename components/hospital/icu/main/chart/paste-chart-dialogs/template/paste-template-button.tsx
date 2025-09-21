import { Button } from '@/components/ui/button'
import { pasteTemplateOrders } from '@/lib/services/icu/chart/order-mutation'
import { pasteChart } from '@/lib/services/icu/chart/paste-chart'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import { CheckIcon, LoaderCircleIcon } from 'lucide-react'
import { useParams } from 'next/navigation'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { toast } from 'sonner'

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
    basicHosData: { vetList },
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
          vetList[0].name,
        )

    toast.success('템플릿 오더를 붙여넣었습니다')

    setIsLoading(false)
    setIsDialogOpen(false)
  }

  return (
    <Button size="icon" onClick={handlePasteSelectedTemplate} variant="ghost">
      {isLoading ? (
        <LoaderCircleIcon className="animate-spin" />
      ) : (
        <CheckIcon size={16} />
      )}
    </Button>
  )
}
