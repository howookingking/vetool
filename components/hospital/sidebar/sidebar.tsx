import SidebarItem from '@/components/hospital/sidebar/sidebar-item'
import SidebarUserInfo from '@/components/hospital/sidebar/sidebar-user-info'
import { SIDEBAR_ITEMS } from '@/constants/hospital/sidebar-items'
import type { UserProfile } from '@/types'

export default async function Sidebar({
  hosId,
  userData,
  isSuper,
}: {
  hosId: string
  userData: UserProfile
  isSuper: boolean
}) {
  return (
    <aside className="fixed left-0 top-0 z-50 hidden h-screen w-14 border-r bg-white 2xl:block">
      <ul>
        {SIDEBAR_ITEMS.map((item) => (
          <SidebarItem
            name={item.name}
            path={item.path}
            iconName={item.iconName}
            key={item.name}
            isReady={item.isReady}
            isSuper={isSuper}
          />
        ))}
      </ul>

      <SidebarUserInfo hosId={hosId} userData={userData} />
    </aside>
  )
}
