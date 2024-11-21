import { handleExport } from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-right-buttons/export-dialog/export-dialog-utils'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/utils'
import type { SelectedChart } from '@/types/icu/chart'
import { addDays, format } from 'date-fns'
import { LoaderCircle } from 'lucide-react'
import { useParams } from 'next/navigation'
import { type Dispatch, type SetStateAction, useState } from 'react'

export default function ExportPngButton({
  chartData,
  setIsDialogOpen,
}: {
  chartData: SelectedChart
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}) {
  const [isExporting, setIsExporting] = useState(false)
  const { hos_id } = useParams()
  const { icu_io_id } = chartData.icu_io
  const { patient_id } = chartData.patient
  const { target_date } = chartData

  const downloadPng = (canvas: HTMLCanvasElement, fileName: string) => {
    const link = document.createElement('a')
    link.download = fileName
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  const handleExportPng = async () => {
    setIsExporting(true)

    await handleExport(
      icu_io_id,
      patient_id,
      target_date,
      hos_id as string,
      (canvases) =>
        canvases.forEach((canvas, index) =>
          downloadPng(
            canvas,
            `${format(addDays(new Date(chartData.icu_io.in_date), index), 'yyyy-MM-dd')}_${chartData.patient.name}.png`,
          ),
        ),
    )

    setIsExporting(false)
    setIsDialogOpen(false)
  }

  return (
    <Button variant="outline" onClick={handleExportPng} disabled={isExporting}>
      사진 저장
      <LoaderCircle
        className={cn(isExporting ? 'ml-2 animate-spin' : 'hidden')}
      />
    </Button>
  )
}
