import OnboardingTitle from '@/components/on-boarding/onboarding-title'
import PrevButton from '@/components/on-boarding/prev-button'
import HospitalsTable from '@/components/on-boarding/select-hospital/hospitals-table'
import { getHospitals } from '@/lib/services/on-boarding/on-boarding'

export default async function SelectHospitalPage() {
  const hospitalsData = await getHospitals()

  return (
    <>
      <PrevButton />

      <OnboardingTitle title="병원선택" />

      <HospitalsTable hospitalsData={hospitalsData} />
    </>
  )
}
