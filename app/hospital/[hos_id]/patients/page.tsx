import SearchPatientContainer from '@/components/hospital/icu/header/register-dialog/search-patient/search-patient-containter'
import PatientRegisterDialog from '@/components/hospital/patients/patient-register-dialog'
import UploadPatientArea from '@/components/hospital/patients/upload-patient-area'

export default async function HospitalPatientsPage(props: {
  params: Promise<{ hos_id: string }>
}) {
  const params = await props.params

  return (
    <div className="overflow-x-scroll p-2">
      <div className="fixed top-2 z-30 hidden items-center gap-2 md:flex">
        <PatientRegisterDialog hosId={params.hos_id} />

        <UploadPatientArea />
      </div>

      <SearchPatientContainer
        itemsPerPage={10}
        isIcu={false}
        hosId={params.hos_id}
      />
    </div>
  )
}
