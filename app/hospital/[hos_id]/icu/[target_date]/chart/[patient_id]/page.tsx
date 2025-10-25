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
  const { hos_id, patient_id, target_date } = await props.params

  const chartData = await getIcuChart(hos_id, target_date, patient_id)

  return (
    <>
      <MobileTitle icon={ClipboardListIcon} title="입원차트" />

      <IcuChartEntry chartData={chartData} patientId={patient_id} />
    </>
  )
}
