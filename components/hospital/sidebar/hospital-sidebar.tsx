import { getVetoolUserData } from '@/lib/services/auth/authorization'
import DesktopSidebar from './desktop/desktop-sidebar'
import MobileSidebar from './mobile/mobile-sidebar'

export default async function HospitalSidebar({ hosId }: { hosId: string }) {
  const vetoolUser = await getVetoolUserData()

  return (
    <>
      <DesktopSidebar hosId={hosId} vetoolUser={vetoolUser} />
      <MobileSidebar hosId={hosId} vetoolUser={vetoolUser} />
    </>
  )
}
