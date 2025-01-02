'use client'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { SIDEBAR_ITEMS } from '@/constants/hospital/sidebar-items'
import type { VetoolUser } from '@/types'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import SidebarUserInfo from '../sidebar-user-info'
import MobileSidebarItem from './mobile-sidebar-item'

export default function MobileSidebar({
  hosId,
  vetoolUser,
}: {
  hosId: string
  vetoolUser: VetoolUser
}) {
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger className="fixed right-0 top-0 z-40 2xl:hidden" asChild>
        <Button variant="ghost" size="icon" className="h-12 w-12 rounded-none">
          <Menu size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="max-w-[240px] p-0">
        <SheetHeader className="h-12">
          <SheetTitle />
          <SheetDescription />
        </SheetHeader>

        <ul className="z-50">
          {SIDEBAR_ITEMS.map((item) => (
            <MobileSidebarItem
              key={item.name}
              isReady={item.isReady}
              hosId={hosId}
              name={item.name}
              path={item.path}
              icon={item.icon}
              setIsSheetOpen={setIsSheetOpen}
              isSuper={vetoolUser.is_super}
            />
          ))}
        </ul>

        <SidebarUserInfo
          hosId={hosId}
          vetoolUser={vetoolUser}
          mobile
          setIsSheetOpen={setIsSheetOpen}
        />
      </SheetContent>
    </Sheet>
  )
}