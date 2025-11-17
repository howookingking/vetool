import CreateHospitalForm from '@/components/on-boarding/create-hospital/create-hospital-form'
import OnboardingTitle from '@/components/on-boarding/onboarding-title'
import PrevButton from '@/components/on-boarding/prev-button'

export default function CreateHospitalPage() {
  return (
    <>
      <PrevButton />

      <OnboardingTitle title="동물병원 생성" />

      <CreateHospitalForm />
    </>
  )
}
