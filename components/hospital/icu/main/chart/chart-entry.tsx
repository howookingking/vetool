'use client'

import NoResult from '@/components/common/no-result'
import AddChartDialogs from '@/components/hospital/icu/main/chart/add-chart-dialogs/add-chart-dialogs'
import Chart from '@/components/hospital/icu/main/chart/chart'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import type { SelectedChart } from '@/types/icu/chart'
import { useMemo } from 'react'

export default function ChartEntry({
  chartData,
  patientId,
}: {
  chartData: SelectedChart
  patientId: string
}) {
  const {
    basicHosData: { sidebarData },
  } = useBasicHosDataContext()

  const hasIcuIo = useMemo(
    () => sidebarData.find((io) => io.patient.patient_id === patientId),
    [patientId, sidebarData],
  )

  // 입원 전 or 퇴원 후
  if (!chartData && !hasIcuIo) {
    return (
      <NoResult
        title={
          <>
            해당환자는 선택한 날짜의 차트가 없습니다 <br /> 선택한 날짜에 아직
            입원을 하지 않았거나 이미 퇴원을 하였습니다
          </>
        }
        className="h-full ring"
      />
    )
  }

  // io가 있고 chart가 없음 => 첫날 차트가 아님
  if (!chartData) {
    return <AddChartDialogs chartData={chartData} />
  }

  // io가 있고 chart가 있고 order가 없는 경우 => 첫날차트
  if (chartData.orders.length === 0) {
    return <AddChartDialogs isFirstChart chartData={chartData} />
  }

  // io가 있고 chart가 있고 order가 있음 => 정상차트
  return <Chart chartData={chartData} />
}
