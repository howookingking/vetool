import { handleExport } from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-right-buttons/export-dialog/export-dialog-utils'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/utils'
import type { SelectedChart } from '@/types/icu/chart'
import jsPDF from 'jspdf'
import { LoaderCircle } from 'lucide-react'
import { useParams } from 'next/navigation'
import { type Dispatch, type SetStateAction, useState } from 'react'

export default function ExportPdfButton({
  chartData,
  setIsDialogOpen,
}: {
  chartData: SelectedChart
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}) {
  const [isExporting, setIsExporting] = useState(false)
  const { in_date, icu_io_id } = chartData.icu_io
  const { name, patient_id } = chartData.patient
  const { target_date } = chartData
  const { hos_id } = useParams()

  const generatePdf = (canvases: HTMLCanvasElement[]) => {
    const firstCanvas = canvases[0]
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [firstCanvas.width / 2, firstCanvas.height / 2],
    })

    canvases.forEach((canvas, index) => {
      if (index > 0) pdf.addPage()
      const imgData = canvas.toDataURL('image/png')
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2)
    })

    return pdf
  }

  const handleExportPdf = async () => {
    setIsExporting(true)

    await handleExport(
      icu_io_id,
      patient_id,
      target_date!,
      hos_id as string,
      (canvases) => {
        const pdf = generatePdf(canvases)

        pdf.save(`(입원일_${in_date})_${name}.pdf`)
      },
    )

    setIsExporting(false)
    setIsDialogOpen(false)
  }

  return (
    <Button onClick={handleExportPdf} disabled={isExporting}>
      PDF 저장
      <LoaderCircle
        className={cn(isExporting ? 'ml-2 animate-spin' : 'hidden')}
      />
    </Button>
  )
}
