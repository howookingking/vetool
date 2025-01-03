import SearchPatientContainer from '@/components/hospital/icu/header/register-dialog/search-patient/search-patient-containter'

export default async function HospitalPatientsPage(props: {
  params: Promise<{ hos_id: string }>
}) {
  const params = await props.params

  return (
    <div className="overflow-x-scroll p-2">
      <SearchPatientContainer
        itemsPerPage={10}
        isIcu={false}
        hosId={params.hos_id}
      />
    </div>
  )
}
