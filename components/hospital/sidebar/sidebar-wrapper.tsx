// 삭제 예정

'use client'

import { Button } from '@/components/ui/button'
import { useSidebarStore } from '@/lib/store/hospital/sidebar'
import { cn } from '@/lib/utils/utils'
import { ArrowLeft } from 'lucide-react'
import React from 'react'

export default function SidebarWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const { isExpanded, toggleSidebar } = useSidebarStore()

  return (
    <aside
      className={cn(
        'hidden h-screen shrink-0 flex-col border-r transition-all duration-200 md:flex',
        isExpanded ? 'w-48' : 'w-14',
      )}
    >
      {children}

      <div className="absolute bottom-12 left-2.5">
        <Button
          size="icon"
          onClick={toggleSidebar}
          variant="ghost"
          className="rounded-full"
        >
          <ArrowLeft
            className={cn(isExpanded ? '' : 'rotate-180', 'transition-all')}
            size={16}
          />
        </Button>
      </div>
    </aside>
  )
}
