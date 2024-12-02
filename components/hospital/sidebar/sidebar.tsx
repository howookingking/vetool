import SidebarItem from '@/components/hospital/sidebar/sidebar-item'
import SidebarUserInfo from '@/components/hospital/sidebar/sidebar-user-info'
import { SIDEBAR_ITEMS } from '@/constants/hospital/sidebar-items'
import { isSuperAccount } from '@/lib/services/auth/authorization'
import { getUnReadFeedbacks } from '@/lib/services/super/feedback/feedback'
import type { UserProfile } from '@/types'

export default async function Sidebar({
  hosId,
  userData,
}: {
  hosId: string
  userData: UserProfile
}) {
  const isSuper = await isSuperAccount()
  const unReadFeedbacks = await getUnReadFeedbacks()

  return (
    <aside className="fixed left-0 top-0 z-50 hidden h-screen w-14 border-r bg-white md:block">
      <ul>
        {SIDEBAR_ITEMS.map((item) => (
          <SidebarItem
            name={item.name}
            path={item.path}
            iconName={item.iconName}
            key={item.name}
            isReady={item.isReady}
            isSuperOnly={item.isSuperOnly}
            isSuper={isSuper}
            unReadFeedbacks={unReadFeedbacks}
          />
        ))}
      </ul>

      <SidebarUserInfo hosId={hosId} userData={userData} />
    </aside>
  )
}
