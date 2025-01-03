'use client'

import SidebarItem from '@/components/hospital/sidebar/desktop/desktop-sidebar-item'
import SidebarUserInfo from '@/components/hospital/sidebar/sidebar-user-info'
import { SIDEBAR_ITEMS } from '@/constants/hospital/sidebar-items'
import type { VetoolUser } from '@/types'

export default function DesktopSidebar({
  hosId,
  vetoolUser,
}: {
  hosId: string
  vetoolUser: VetoolUser
}) {
  return (
    <aside className="fixed left-0 top-0 z-50 hidden h-screen w-14 border-r bg-white 2xl:block">
      <ul>
        {SIDEBAR_ITEMS.map((item) => (
          <SidebarItem
            name={item.name}
            path={item.path}
            key={item.name}
            isReady={item.isReady}
            icon={item.icon}
            isSuper={vetoolUser.is_super}
          />
        ))}
      </ul>

      <SidebarUserInfo hosId={hosId} vetoolUser={vetoolUser} />
    </aside>
  )
}
