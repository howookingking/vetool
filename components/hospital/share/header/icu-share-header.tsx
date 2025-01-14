import IcuShareDatePicker from '@/components/hospital/share/header/icu-share-date-picker'
import IcuSharePatientInfo from '@/components/hospital/share/header/icu-share-patient-info'
import type { SelectedChart } from '@/types/icu/chart'

export default function IcuShareHeader({
  targetDate,
  chartData,
}: {
  targetDate: string
  chartData: Omit<SelectedChart, 'orders'>
}) {
  const { patient, weight, weight_measured_date } = chartData

  return (
    <div className="flex flex-col gap-2 2xl:grid 2xl:grid-cols-3 2xl:items-center 2xl:gap-0">
      <IcuShareDatePicker targetDate={targetDate} />
      <IcuSharePatientInfo
        patientData={patient}
        weight={weight}
        weightMeasuredDate={weight_measured_date as string}
      />
    </div>
  )
}
