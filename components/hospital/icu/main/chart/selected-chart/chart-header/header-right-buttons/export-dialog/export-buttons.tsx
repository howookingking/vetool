import NewFeature from '@/components/common/new-feature'
import ExportPdfButton from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-right-buttons/export-dialog/export-pdf-button'
import type { SelectedIcuChart } from '@/types/icu/chart'
import type { Dispatch, RefObject, SetStateAction } from 'react'
import ExportPngDialog from './export-png-dialog'
import ExportTextDialog from './export-text-dialog'

type Props = {
  chartData: SelectedIcuChart
  setIsParentsDialogOpen: Dispatch<SetStateAction<boolean>>
}

export default function ExportButtons({
  chartData,
  setIsParentsDialogOpen,
}: Props) {
  return (
    <>
      <NewFeature>
        <ExportTextDialog chartData={chartData} />
      </NewFeature>

      <NewFeature>
        <ExportPngDialog
          chartData={chartData}
          setIsParentsDialogOpen={setIsParentsDialogOpen}
        />
      </NewFeature>

      <ExportPdfButton
        chartData={chartData}
        setIsParentsDialogOpen={setIsParentsDialogOpen}
      />
    </>
  )
}
