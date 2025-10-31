import { Button } from '@/components/ui/button'
import { getSelectedIcuChart } from '@/lib/services/icu/chart/get-icu-chart'
import { getTemplateChart } from '@/lib/services/icu/template/template'
import { useCopiedChartStore } from '@/lib/store/icu/copied-chart'
import { usePreviewDialogStore } from '@/lib/store/icu/preview-dialog'
import { Eye, LoaderCircle } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'

interface BasePreviewButtonProps {
  isTemplate: boolean
}

interface PatientPreviewProps extends BasePreviewButtonProps {
  isTemplate: false
  targetDate: string
  patientId: string
  chartId?: never
}

interface TemplatePreviewProps extends BasePreviewButtonProps {
  isTemplate: true
  chartId: string
  targetDate?: never
  patientId?: never
}

type PreviewButtonProps = PatientPreviewProps | TemplatePreviewProps

async function fetchChartData(props: PreviewButtonProps, hosId: string) {
  if (props.isTemplate) {
    return await getTemplateChart(props.chartId)
  }
  return await getSelectedIcuChart(hosId, props.targetDate, props.patientId)
}

export default function PreviewButton(props: PreviewButtonProps) {
  const { hos_id } = useParams()

  const { setPreviewDialogOpen } = usePreviewDialogStore()
  const { setCopiedChart } = useCopiedChartStore()

  const [isPreviewing, setIsPreviewing] = useState(false)

  const handleOpenPreviewDialog = async () => {
    setIsPreviewing(true)

    const chartData = await fetchChartData(props, hos_id as string)
    setCopiedChart(chartData)

    setPreviewDialogOpen(true)
    setIsPreviewing(false)
  }

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={handleOpenPreviewDialog}
      disabled={isPreviewing}
      className="mx-auto flex items-center justify-center"
    >
      {isPreviewing ? (
        <LoaderCircle size={18} className="animate-spin" />
      ) : (
        <Eye size={18} />
      )}
    </Button>
  )
}
