import { SIDEBAR_ITEMS } from '@/constants/hospital/sidebar-items'
import { cloneElement } from 'react'

export default function DesktopMockupSidebar() {
  return (
    <div className="flex max-w-12 flex-col items-center gap-6 border-r border-zinc-300 p-4 sm:max-w-full">
      {SIDEBAR_ITEMS.slice(0, -1).map((item) => (
        <div key={item.name}>{cloneElement(item.icon, { size: 16 })}</div>
      ))}
    </div>
  )
}
