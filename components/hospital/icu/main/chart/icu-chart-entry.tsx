'use client'

import NoResultSquirrel from '@/components/common/no-result-squirrel'
import Chart from '@/components/hospital/icu/main/chart/chart'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import { type SelectedChart } from '@/types/icu/chart'
import PasteChartDialogs from './paste-chart-dialogs/paste-chart-dialogs'

type Props = {
  chartData: SelectedChart
  patientId: string
}

export default function IcuChartEntry({ chartData, patientId }: Props) {
  const {
    basicHosData: { sidebarData },
  } = useBasicHosDataContext()

  const hasIcuIo = sidebarData.find((io) => io.patient.patient_id === patientId)

  // 입원 전 or 퇴원 후
  if (!chartData && !hasIcuIo) {
    return (
      <NoResultSquirrel
        className="h-full flex-col"
        size="lg"
        text={
          <div className="text-center">
            해당환자는 선택한 날짜에 차트가 없습니다 <br /> 선택한 날짜에 아직
            입원을 하지 않았거나 이미 퇴원을 하였습니다
          </div>
        }
      />
    )
  }

  // io가 있고 chart가 없음 => 첫날 차트가 아님
  if (hasIcuIo && !chartData) {
    return <PasteChartDialogs chartData={chartData} />
  }

  // io가 있고 chart가 있고 order가 없는 경우 => 첫날차트
  if (hasIcuIo && chartData && chartData.orders.length === 0) {
    return (
      <PasteChartDialogs
        chartData={chartData}
        patientId={patientId}
        firstChart
      />
    )
  }

  // io가 있고 chart가 있고 order가 있음 => 정상차트
  return <Chart chartData={chartData} />
}
