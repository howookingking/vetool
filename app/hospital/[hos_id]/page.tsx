import HospitalHomeBody from '@/components/hospital/home/body/hospital-home-body'
import HospitalHomeHeader from '@/components/hospital/home/header/hospital-home-header'
import { getVetoolUserData } from '@/lib/services/auth/authorization'
import { redirectToOwnHospital } from '@/lib/utils/utils'

export default async function HospitalHomePage(props: {
  params: Promise<{ hos_id: string }>
}) {
  const params = await props.params
  const vetoolUser = await getVetoolUserData()
  const isSuper = vetoolUser.is_super

  redirectToOwnHospital(vetoolUser, params.hos_id, isSuper)

  return (
    <>
      <HospitalHomeHeader isSuper={isSuper} hosId={params.hos_id} />
      <HospitalHomeBody hosId={params.hos_id} />
    </>
  )
}
