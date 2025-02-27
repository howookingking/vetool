import DesktopSidebar from '@/components/hospital/sidebar/desktop/desktop-sidebar'
import MobileSidebar from '@/components/hospital/sidebar/mobile/mobile-sidebar'
import { getPlan } from '@/lib/services/auth/plan'
import { getVetoolUserData } from '@/lib/services/auth/authorization'

export default async function HospitalSidebar({ hosId }: { hosId: string }) {
  const vetoolUser = await getVetoolUserData()
  const plan = await getPlan(hosId)

  return (
    <>
      <DesktopSidebar hosId={hosId} vetoolUser={vetoolUser} plan={plan} />
      <MobileSidebar hosId={hosId} vetoolUser={vetoolUser} plan={plan} />
    </>
  )
}
