import { type LucideIcon } from 'lucide-react'
import React from 'react'

export default function MobileTitle({
  title,
  icon: Icon,
}: {
  title: string
  icon: LucideIcon
}) {
  return (
    <div className="fixed left-1/2 top-7 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 font-bold md:hidden">
      <Icon size={18} />
      {title}
    </div>
  )
}
