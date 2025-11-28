import IcuPatientUpdateDialog from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-center/icu-patient-update-dialog'
import VitalChartDialog from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-center/vital-chart/vital-chart-dialog'
import type { SelectedIcuChart } from '@/types/icu/chart'

type Props = {
  chartData: SelectedIcuChart
  hosId: string
}

export default function HeaderCenter({ chartData, hosId }: Props) {
  const { patient, weight, weight_measured_date, icu_io } = chartData

  return (
    <div className="flex h-12 items-center justify-center gap-0.5">
      <IcuPatientUpdateDialog
        patient={patient}
        weight={weight}
        weightMeasuredDate={weight_measured_date}
        icuChartId={chartData.icu_chart_id}
        hosId={hosId}
      />

      <VitalChartDialog icuIoId={icu_io.icu_io_id} inDate={icu_io.in_date} />
    </div>
  )
}
