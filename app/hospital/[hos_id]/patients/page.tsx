import SearchPatientContainer from '@/components/common/patients/search/search-patient-containter'

export default async function HospitalPatientsPage(props: {
  params: Promise<{ hos_id: string }>
}) {
  const params = await props.params

  return (
    <div className="overflow-x-scroll p-2">
      <SearchPatientContainer hosId={params.hos_id} />
    </div>
  )
}
