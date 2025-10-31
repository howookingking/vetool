// 첫날 차트를 생성하면 icu_io와 icu_chart는 무조건 생성됨
// 단, icu_chart의 order의 개수가 0임
// 위 조건을 바탕으로 차트 진입로직 작성

'use client'

import NoResultSquirrel from '@/components/common/no-result-squirrel'
import Chart from '@/components/hospital/icu/main/chart/chart'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import { SelectedIcuChart } from '@/types/icu/chart'
import PasteChartDialogs from './paste-chart-dialogs/paste-chart-dialogs'

type Props = {
  selectedIcuChart: SelectedIcuChart | null
  patientId: string
  targetDate: string
}

export default function IcuChartEntry({
  selectedIcuChart,
  patientId,
  targetDate,
}: Props) {
  const {
    basicHosData: { icuSidebarPatients },
  } = useBasicHosDataContext()

  const hasIcuIo = icuSidebarPatients.find(
    (p) => p.patient.patient_id === patientId,
  )

  // 차트도 없고 io도 없음 => 입원 전 or 퇴원 후
  if (!selectedIcuChart && !hasIcuIo) {
    return (
      <NoResultSquirrel
        className="h-mobile flex-col 2xl:h-desktop"
        size="lg"
        text={
          <div className="text-center">
            해당환자는 {targetDate} 차트가 없습니다 <br /> 입원 전 또는 퇴원
            후입니다
          </div>
        }
      />
    )
  }

  // io가 있고 chart가 없음 => 이미 입원을 하고 입원을 연장하려는 경우
  if (hasIcuIo && !selectedIcuChart) {
    return <PasteChartDialogs selectedIcuChart={selectedIcuChart} />
  }

  // io가 있고 chart가 있고 order가 없는 경우 => 첫날차트
  if (hasIcuIo && selectedIcuChart && selectedIcuChart.orders.length === 0) {
    return (
      <PasteChartDialogs
        selectedIcuChart={selectedIcuChart}
        patientId={patientId}
        firstChart
      />
    )
  }

  // io가 있고 chart가 있고 order가 있음 => 정상차트
  if (hasIcuIo && selectedIcuChart && selectedIcuChart.orders.length > 0) {
    return <Chart selectedIcuChart={selectedIcuChart} />
  }
}
