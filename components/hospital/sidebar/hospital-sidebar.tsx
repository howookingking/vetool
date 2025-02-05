import DesktopSidebar from '@/components/hospital/sidebar/desktop/desktop-sidebar'
import MobileSidebar from '@/components/hospital/sidebar/mobile/mobile-sidebar'
import { getVetoolUserData } from '@/lib/services/auth/authorization'

export default async function HospitalSidebar({ hosId }: { hosId: string }) {
  const vetoolUser = await getVetoolUserData()

  return (
    <>
      <DesktopSidebar hosId={hosId} vetoolUser={vetoolUser} />
      <MobileSidebar hosId={hosId} vetoolUser={vetoolUser} />
    </>
  )
}
