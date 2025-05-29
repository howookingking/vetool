import IcuChartEntry from '@/components/hospital/icu/main/chart/icu-chart-entry'
import { getIcuChart } from '@/lib/services/icu/chart/get-icu-chart'

export default async function PatientChecklistPage() {
  const params = await props.params

  const chartData = await getIcuChart(
    params.hos_id,
    params.target_date,
    params.patient_id,
  )

  return <div>chekc</div>

  //   <IcuChartEntry chartData={chartData} patientId={params.patient_id} />
}
