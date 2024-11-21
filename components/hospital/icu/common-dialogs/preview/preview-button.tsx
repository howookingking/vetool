import { Button } from '@/components/ui/button'
import { getIcuChart } from '@/lib/services/icu/chart/get-icu-chart'
import { getReadOnlyChartOrders } from '@/lib/services/icu/template/template'
import { useCopiedChartStore } from '@/lib/store/icu/copied-chart'
import { usePreviewDialogStore } from '@/lib/store/icu/preview-dialog'
import { Eye, LoaderCircle } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'

export default function PreviewButton({
  targetDate,
  patientId,
  chartId,
}: {
  targetDate: string
  patientId: string
  chartId?: string
}) {
  const { hos_id } = useParams()
  const { setPreviewDialogOpen } = usePreviewDialogStore()
  const { setCopiedChart, setReadOnlyOrders, setIsReadOnly } =
    useCopiedChartStore()
  const [isPreviewing, setIsPreviewing] = useState(false)

  const handleOpenPreviewDialog = async () => {
    setIsPreviewing(true)

    if (patientId) {
      const selectedChartData = await getIcuChart(
        hos_id as string,
        targetDate,
        patientId!,
      )

      setCopiedChart(selectedChartData)
    } else {
      const icuChartOrders = await getReadOnlyChartOrders(chartId!)

      setReadOnlyOrders(icuChartOrders)
      setIsReadOnly(true)
    }

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
