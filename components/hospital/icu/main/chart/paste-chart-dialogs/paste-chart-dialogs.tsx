import {
  getPatientIos,
  PatientIo,
} from '@/lib/services/icu/chart/get-icu-chart'
import type { SelectedIcuChart } from '@/types/icu/chart'
import { useEffect, useState } from 'react'
import PastePastChartDialog from './past-chart/paste-past-chart-dialog'
import PasteCopiedChartDialog from './paste-copied-chart-dialog'
import PasteDefaultChartDialog from './paste-default-chart-dialog'
import PastePrevChartDialog from './paste-prev-chart-dialog'
import PasteTemplateOrderDialog from './template/paste-template-order-dialog'
import UndoIoDialog from './undo-Io-dialogi'

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
  const [patientIos, setPatientIos] = useState<PatientIo[]>([])

  useEffect(() => {
    if (!firstChart) return
    getPatientIos(patientId).then(setPatientIos)
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

      {/* 무조건 당일차트는 생성되므로 2개 이상인 경우 과거차트가 있음 */}
      {/* paste, past 스펠링  */}
      {patientIos.length > 1 && (
        <PastePastChartDialog
          targetDate={targetDate}
          patientId={patientId}
          patientIos={patientIos.slice(1)}
        />
      )}

      <PasteTemplateOrderDialog
        hosId={hosId}
        patientId={patientId}
        targetDate={targetDate}
        isOrderCreator={false}
        chartId={null}
      />

      <PasteCopiedChartDialog patientId={patientId} targetDate={targetDate} />
    </div>
  )
}
