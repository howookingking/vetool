import MobileTitle from '@/components/common/mobile-title'
import IcuChartEntry from '@/components/hospital/icu/main/chart/icu-chart-entry'
import { getIcuChart } from '@/lib/services/icu/chart/get-icu-chart'
import { ClipboardListIcon } from 'lucide-react'

export default async function PatientChartPage(props: {
  params: Promise<{
    hos_id: string
    target_date: string
    patient_id: string
  }>
}) {
  const params = await props.params

  const chartData = await getIcuChart(
    params.hos_id,
    params.target_date,
    params.patient_id,
  )

  return (
    <>
      <MobileTitle icon={ClipboardListIcon} title="입원차트" />

      <IcuChartEntry chartData={chartData} patientId={params.patient_id} />
    </>
  )
}
