'use client'

import CalculatorSheet from '@/components/hospital/calculator/calculator-sheet'
import MobileSidebarItem from '@/components/hospital/sidebar/mobile/mobile-sidebar-item'
import SidebarUserInfo from '@/components/hospital/sidebar/sidebar-user-info'
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
      <SheetContent
        side="right"
        className="flex h-screen max-w-[240px] flex-col justify-between p-0"
        noCloseButton
      >
        <SheetHeader className="hidden">
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

        <div className="flex flex-col items-end">
          <CalculatorSheet />

          <SidebarUserInfo
            mobile
            hosId={hosId}
            vetoolUser={vetoolUser}
            setIsSheetOpen={setIsSheetOpen}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}
