import { SIDEBAR_MENUS } from '@/components/hospital/sidebar/hospital-sidebar'
import { cloneElement } from 'react'

export default function DesktopMockupSidebar() {
  return (
    <div className="flex max-w-12 flex-col items-center gap-6 border-r border-zinc-300 p-4 sm:max-w-full">
      {SIDEBAR_MENUS.slice(0, -1).map(({ name, icon }) => (
        <div key={name}>{cloneElement(icon, { size: 16 })}</div>
      ))}
    </div>
  )
}
