import NewFeature from '@/components/common/new-feature'
import ExportPdfButton from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-right-buttons/export-dialog/export-pdf-button'
import ExportPngButton from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-right-buttons/export-dialog/export-png-button'
import type { SelectedIcuChart } from '@/types/icu/chart'
import { Dispatch, SetStateAction } from 'react'
import ExportTextDialog from './export-text-dialog'

type ExportButtonsProps = {
  chartData: SelectedIcuChart
  setIsParentsDialogOpen: Dispatch<SetStateAction<boolean>>
}

export default function ExportButtons({
  chartData,
  setIsParentsDialogOpen,
}: ExportButtonsProps) {
  return (
    <>
      <NewFeature>
        <ExportTextDialog chartData={chartData} />
      </NewFeature>

      <ExportPngButton
        chartData={chartData}
        setIsParentsDialogOpen={setIsParentsDialogOpen}
      />

      <ExportPdfButton
        chartData={chartData}
        setIsParentsDialogOpen={setIsParentsDialogOpen}
      />
    </>
  )
}
