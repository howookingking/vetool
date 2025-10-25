'use client'

import AdminSidebarItem from '@/components/hospital/admin/admin-sidebar-item'
import { ADMIN_SIDEBAR_ITEMS } from '@/constants/admin/admin-sidebar-items'

export default function AdminSidebar() {
  return (
    <aside className="h-screen w-48 border-r">
      <ul className="flex flex-col gap-1 p-2">
        {ADMIN_SIDEBAR_ITEMS.map((item) => (
          <AdminSidebarItem
            key={item.name}
            icon={item.icon}
            name={item.name}
            path={item.path}
          />
        ))}
      </ul>
    </aside>
  )
}
