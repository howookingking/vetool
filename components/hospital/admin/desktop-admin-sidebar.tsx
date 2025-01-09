'use client'

import AdminSidebarItem from '@/components/hospital/admin/admin-sidebar-item'
import { ADMIN_SIDEBAR_ITEMS } from '@/constants/admin/admin-sidebar-items'

export default function DesktopAdminSidebar() {
  return (
    <aside className="hidden h-screen w-48 border-r md:block">
      <ul className="flex flex-col gap-2 p-2">
        {ADMIN_SIDEBAR_ITEMS.map((item) => (
          <AdminSidebarItem
            key={item.name}
            icon={item.icon}
            name={item.name}
            path={item.path}
            isResponsive={item.isResponsive}
            isReady={item.isReady}
          />
        ))}
      </ul>
    </aside>
  )
}
