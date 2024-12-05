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
import type { UserProfile } from '@/types'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import MobileSidebarItem from './mobile-sidebar-item'
import SidebarUserInfo from './sidebar-user-info'

export default function MobileSidebar({
  hosId,
  userData,
  isSuper,
}: {
  hosId: string
  userData: UserProfile
  isSuper: boolean
}) {
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger className="fixed right-0 top-0 z-40 md:hidden" asChild>
        <Button variant="ghost" size="icon" className="h-12 w-12 rounded-none">
          <Menu size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="p-0">
        <SheetHeader className="h-12">
          <SheetTitle />
          <SheetDescription />
        </SheetHeader>

        <ul className="z-50">
          {SIDEBAR_ITEMS.map((item) => {
            return (
              <MobileSidebarItem
                key={item.name}
                hosId={hosId}
                item={item}
                setIsSheetOpen={setIsSheetOpen}
                isSuper={isSuper}
              />
            )
          })}
        </ul>

        <SidebarUserInfo
          hosId={hosId}
          userData={userData}
          mobile
          setIsSheetOpen={setIsSheetOpen}
        />
      </SheetContent>
    </Sheet>
  )
}
