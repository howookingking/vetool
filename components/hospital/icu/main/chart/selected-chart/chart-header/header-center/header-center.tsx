import UpdatePatientDialog from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-center/update-patient-dialog'
import VitalChartDialog from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-center/vital-chart/vital-chart-dialog'
import type { SelectedChart } from '@/types/icu/chart'

export default function HeaderCenter({
  chartData,
}: {
  chartData: SelectedChart
}) {
  const { patient, weight, weight_measured_date, icu_io } = chartData

  return (
    <div className="flex h-12 items-center justify-center gap-0.5">
      {/* <BookmarkDialog
        icuChartId={chartData.icu_chart_id}
        bookmarkData={chartData.template}
        icon="star"
      /> */}
      <UpdatePatientDialog
        patientData={{ ...patient, isIcu: true }}
        weight={weight}
        weightMeasuredDate={weight_measured_date}
        icuChartId={chartData.icu_chart_id}
      />

      <VitalChartDialog
        patientId={patient.patient_id}
        inDate={icu_io.in_date}
      />
    </div>
  )
}
