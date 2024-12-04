import type { SelectedChart } from '@/types/icu/chart'
import { Dispatch, SetStateAction } from 'react'
import ExportPdfButton from './export-pdf-button'
import ExportPngButton from './export-png-button'

export default function ExportButtons({
  chartData,
  setIsDialogOpen,
}: {
  chartData: SelectedChart
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <>
      <ExportPngButton
        chartData={chartData}
        setIsDialogOpen={setIsDialogOpen}
      />

      <ExportPdfButton
        chartData={chartData}
        setIsDialogOpen={setIsDialogOpen}
      />
    </>
  )
}
