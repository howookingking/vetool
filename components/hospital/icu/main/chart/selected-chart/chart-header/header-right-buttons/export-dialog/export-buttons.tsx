import ExportPdfButton from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-right-buttons/export-dialog/export-pdf-button'
import ExportPngButton from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-right-buttons/export-dialog/export-png-button'
import ExportTextButton from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-right-buttons/export-dialog/export-text-button'
import { type SelectedChart } from '@/types/icu/chart'
import { Dispatch, SetStateAction } from 'react'

type ExportButtonsProps = {
  chartData: SelectedChart
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}

export default function ExportButtons({
  chartData,
  setIsDialogOpen,
}: ExportButtonsProps) {
  return (
    <>
      <ExportTextButton
        chartData={chartData}
        setIsDialogOpen={setIsDialogOpen}
      />

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
