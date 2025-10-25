import MobileTitle from '@/components/common/mobile-title'
import SearchPatientContainer from '@/components/common/patients/search/search-patient-containter'
import { PawPrintIcon } from 'lucide-react'

export default async function HospitalPatientsPage(props: {
  params: Promise<{ hos_id: string }>
}) {
  const params = await props.params

  return (
    <>
      <MobileTitle icon={PawPrintIcon} title="환자목록" />

      <SearchPatientContainer
        hosId={params.hos_id}
        isIcu={false}
        setIsIcuRegisterDialogOpen={undefined}
      />
    </>
  )
}
