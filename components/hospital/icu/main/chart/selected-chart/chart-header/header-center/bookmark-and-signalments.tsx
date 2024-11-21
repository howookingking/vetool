import BookmarkDialog from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-center/bookmark-dialog'
import UpdatePatientDialog from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-center/update-patient-dialog'
import type { SelectedChart } from '@/types/icu/chart'

export default function HeaderCenter({
  chartData,
}: {
  chartData: SelectedChart
}) {
  const { patient, icu_io, weight, weight_measured_date } = chartData

  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-2 rounded-md bg-muted p-2 text-xs md:h-12 md:bg-transparent md:text-sm">
      <BookmarkDialog
        icuChartId={chartData.icu_chart_id}
        bookmarkData={chartData.template}
        icon="star"
      />
      <UpdatePatientDialog
        patientData={{ ...patient, isIcu: true }}
        ageInDays={icu_io.age_in_days}
        weight={weight}
        weightMeasuredDate={weight_measured_date}
        icuChartId={chartData.icu_chart_id}
      />
    </div>
  )
}
