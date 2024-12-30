import NoResultSquirrel from '@/components/common/no-result-squirrel'
import AddChartDialogs from '@/components/hospital/icu/main/chart/add-chart-dialogs/add-chart-dialogs'
import Chart from '@/components/hospital/icu/main/chart/chart'
import type { SelectedChart } from '@/types/icu/chart'

export default function ChartEntry({
  chartData,
  patientId,
}: {
  chartData: SelectedChart
  patientId: string
}) {
  // chartData에서 icu_io가 있는지 확인하여 hasIcuIo 판단
  const hasIcuIo = chartData?.icu_io?.icu_io_id !== undefined

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
  if (!chartData) {
    return <AddChartDialogs chartData={chartData} />
  }

  // io가 있고 chart가 있고 order가 없는 경우 => 첫날차트
  if (chartData.orders.length === 0) {
    return <AddChartDialogs chartData={chartData} patientId={patientId} />
  }

  // io가 있고 chart가 있고 order가 있음 => 정상차트
  return <Chart chartData={chartData} />
}
