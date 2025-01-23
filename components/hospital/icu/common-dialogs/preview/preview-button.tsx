import { Button } from '@/components/ui/button'
import { getIcuChart } from '@/lib/services/icu/chart/get-icu-chart'
import { getTemplateChart } from '@/lib/services/icu/template/template'
import { useCopiedChartStore } from '@/lib/store/icu/copied-chart'
import { usePreviewDialogStore } from '@/lib/store/icu/preview-dialog'
import { Eye, LoaderCircle } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'

export default function PreviewButton({
  targetDate,
  patientId,
  chartId,
  isTemplate,
}: {
  targetDate: string | null
  patientId: string
  chartId?: string
  isTemplate?: boolean
}) {
  const { hos_id } = useParams()

  const { setPreviewDialogOpen } = usePreviewDialogStore()
  const { setCopiedChart } = useCopiedChartStore()

  const [isPreviewing, setIsPreviewing] = useState(false)

  const handleOpenPreviewDialog = async () => {
    setIsPreviewing(true)

    let fetchedChartData = null

    if (isTemplate) {
      fetchedChartData = await getTemplateChart(chartId!)
    } else {
      fetchedChartData = await getIcuChart(
        hos_id as string,
        targetDate,
        patientId!,
      )
    }

    setCopiedChart(fetchedChartData)

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
