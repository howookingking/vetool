import MobileTitle from '@/components/common/mobile-title'
import IcuChartEntry from '@/components/hospital/icu/main/chart/icu-chart-entry'
import { getIcuChartByPatientIdAndTargetDate } from '@/lib/services/icu/chart/get-icu-chart'
import { ClipboardListIcon } from 'lucide-react'

export default async function PatientChartPage(
  props: PageProps<'/hospital/[hos_id]/icu/[target_date]/chart/[patient_id]'>,
) {
  const { hos_id, patient_id, target_date } = await props.params

  const selectedIcuChart = await getIcuChartByPatientIdAndTargetDate(
    target_date,
    patient_id,
  )

  return (
    <>
      <MobileTitle icon={ClipboardListIcon} title="입원차트" />

      <IcuChartEntry
        targetDate={target_date}
        hosId={hos_id}
        selectedIcuChart={selectedIcuChart}
        patientId={patient_id}
      />
    </>
  )
}
