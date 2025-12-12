'use client'

import AdminSidebarItem from '@/components/hospital/admin/admin-sidebar-item'
import { SyringeIcon, UserCheckIcon, UsersIcon } from 'lucide-react'

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

const ADMIN_SIDEBAR_ITEMS = [
  {
    name: '스태프관리',
    path: 'staff',
    icon: UsersIcon,
  },
  {
    name: '사용승인',
    path: 'approval',
    icon: UserCheckIcon,
  },
  {
    name: '입원차트 설정',
    path: 'icu-settings',
    icon: SyringeIcon,
  },
  // {
  //   name: '약물설정',
  //   path: 'drug-settings',
  //   icon: Pill,
  //   isReady: false,
  //   isResponsive: false,
  // },
  // {
  //   name: '사료설정',
  //   path: 'diet-settings',
  //   icon: Utensils,
  //   isReady: false,
  //   isResponsive: false,
  // },
  // {
  //   name: '검사설정',
  //   path: 'test-settings',
  //   icon: TestTubeDiagonal,
  //   isReady: false,
  //   isResponsive: false,
  // },
] as const
