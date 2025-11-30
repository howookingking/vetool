import { getPrevIoChartData } from '@/lib/services/icu/chart/get-icu-chart'
import type { PrevIoChartData, SelectedIcuChart } from '@/types/icu/chart'
import { useEffect, useState } from 'react'
import PasteCopiedChartDialog from './paste-copied-chart-dialog'
import PasteDefaultChartDialog from './paste-default-chart-dialog'
import PastePrevChartDialog from './paste-prev-chart-dialog'
import PastePrevIoChartDialog from './paste-prev-io-chart-dialog'
import PasteTemplateOrderDialog from './template/paste-template-order-dialog'
import UndoIoDialog from './undo-Io-dialogi'
import { useCopiedChartStore } from '@/lib/store/icu/copied-chart'

type Props =
  | {
      firstChart: true
      selectedIcuChart: SelectedIcuChart
      patientId: string
      hosId: string
      targetDate: string
    }
  | {
      firstChart: false
      selectedIcuChart: null
      patientId: string
      hosId: string
      targetDate: string
    }

export default function PasteChartDialogs({
  selectedIcuChart,
  patientId,
  firstChart,
  hosId,
  targetDate,
}: Props) {
  const [prevIoChartData, setPrevIoChartData] =
    useState<PrevIoChartData | null>(null)

  useEffect(() => {
    if (!firstChart) return
    getPrevIoChartData(patientId).then(setPrevIoChartData)
  }, [patientId, firstChart])

  return (
    <div className="flex h-mobile flex-col items-center justify-center gap-6 px-5 md:px-2 2xl:h-desktop">
      {firstChart ? (
        <>
          <PasteDefaultChartDialog
            icuChartId={selectedIcuChart.icu_chart_id}
            hosId={hosId}
          />
          <UndoIoDialog
            icuIoId={selectedIcuChart.icu_io.icu_io_id}
            hosId={hosId}
            targetDate={targetDate}
          />
        </>
      ) : (
        <PastePrevChartDialog targetDate={targetDate} patientId={patientId} />
      )}

      {prevIoChartData && (
        <PastePrevIoChartDialog
          prevIoChartData={prevIoChartData}
          patientId={patientId}
          targetDate={targetDate}
        />
      )}

      <PasteTemplateOrderDialog
        hosId={hosId}
        patientId={patientId}
        targetDate={targetDate}
      />

      <PasteCopiedChartDialog patientId={patientId} targetDate={targetDate} />
    </div>
  )
}
