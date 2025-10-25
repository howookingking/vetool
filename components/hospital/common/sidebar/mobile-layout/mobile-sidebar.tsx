'use client'

import CalculatorSheet from '@/components/hospital/calculator/calculator-sheet'
import MobileSidebarItem from '@/components/hospital/common/sidebar/mobile-layout/mobile-sidebar-item'
import SidebarUserDropdown from '@/components/hospital/common/sidebar/sidebar-user-dropdown'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { HOS_SIDEBAR_MENUS } from '@/constants/hospital/hos-sidebar-menus'
import type { Plan } from '@/constants/plans'
import type { VetoolUser } from '@/types'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { MenuIcon } from 'lucide-react'
import { useState } from 'react'

type Props = {
  hosId: string
  vetoolUser: VetoolUser
  plan: Plan
}

export default function MobileSidebar({ hosId, vetoolUser, plan }: Props) {
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger className="absolute right-0 top-0 z-40 2xl:hidden" asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-12 w-12 rounded-none border-l"
        >
          <MenuIcon size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex h-screen max-w-[240px] flex-col justify-between p-0"
        noCloseButton
      >
        <VisuallyHidden>
          <SheetHeader>
            <SheetTitle />
            <SheetDescription />
          </SheetHeader>
        </VisuallyHidden>

        <ul className="z-50">
          {HOS_SIDEBAR_MENUS.map(({ icon, isReady, name, path }) => (
            <MobileSidebarItem
              key={name}
              isReady={isReady}
              hosId={hosId}
              name={name}
              path={path}
              icon={icon}
              setIsSheetOpen={setIsSheetOpen}
              isSuper={vetoolUser.is_super}
            />
          ))}
        </ul>

        <div className="flex flex-col items-end">
          <CalculatorSheet plan={plan} />

          <SidebarUserDropdown
            isMobile
            hosId={hosId}
            vetoolUser={vetoolUser}
            setIsSheetOpen={setIsSheetOpen}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}
