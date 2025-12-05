import MobileTitle from '@/components/common/mobile-title'
import HospitalHomeBody from '@/components/hospital/home/body/hospital-home-body'
import HospitalHomeHeader from '@/components/hospital/home/header/hospital-home-header'
import { getVetoolUserData } from '@/lib/services/auth/authorization'
import { redirectToOwnHospital } from '@/lib/utils/utils'
import { HomeIcon } from 'lucide-react'

export default async function HospitalHomePage(
  props: PageProps<'/hospital/[hos_id]'>,
) {
  const { hos_id } = await props.params
  const vetoolUser = await getVetoolUserData()
  const isSuper = vetoolUser.is_super

  redirectToOwnHospital(vetoolUser, hos_id, isSuper)

  return (
    <>
      <MobileTitle icon={HomeIcon} title="병원 홈" />

      <HospitalHomeHeader isSuper={isSuper} hosId={hos_id} />

      <HospitalHomeBody hosId={hos_id} />
    </>
  )
}
