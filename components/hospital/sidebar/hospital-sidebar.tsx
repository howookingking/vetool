import DesktopSidebar from '@/components/hospital/sidebar/desktop/desktop-sidebar'
import MobileSidebar from '@/components/hospital/sidebar/mobile/mobile-sidebar'
import { getVetoolUserData } from '@/lib/services/auth/authorization'
// import { getPlan } from '@/lib/services/auth/plan'

export default async function HospitalSidebar({ hosId }: { hosId: string }) {
  const vetoolUser = await getVetoolUserData()

  // 요금제 기능 비화성화
  // const plan = await getPlan(hosId)
  const plan = 'severe'

  return (
    <>
      <DesktopSidebar hosId={hosId} vetoolUser={vetoolUser} plan={plan} />

      <MobileSidebar hosId={hosId} vetoolUser={vetoolUser} plan={plan} />
    </>
  )
}
