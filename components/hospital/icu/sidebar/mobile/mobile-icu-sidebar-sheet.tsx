'use client'

import MobileSidebar from '@/components/hospital/icu/sidebar/mobile/mobile-icu-sidebar'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import type { IcuSidebarPatient } from '@/lib/services/icu/icu-layout'
import type { Vet } from '@/types'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { MenuIcon } from 'lucide-react'
import { useState } from 'react'

type Props = {
  icuSidebarPatients: IcuSidebarPatient[]
  vetList: Vet[]
  targetDate: string
  hosId: string
}

export function MobileIcuSidebarSheet({
  icuSidebarPatients,
  vetList,
  targetDate,
  hosId,
}: Props) {
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const handleCloseMobileDrawer = () => setIsSheetOpen(false)

  return (
    <div className="2xl:hidden">
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button
            className="fixed top-0 z-40 h-12 w-12 rounded-none"
            size="icon"
          >
            <MenuIcon size={24} />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="px-0 py-2" noCloseButton>
          <VisuallyHidden>
            <SheetHeader>
              <SheetTitle />
              <SheetDescription />
            </SheetHeader>
          </VisuallyHidden>

          <MobileSidebar
            targetDate={targetDate}
            icuSidebarPatients={icuSidebarPatients}
            handleCloseMobileDrawer={handleCloseMobileDrawer}
            vetList={vetList}
            hosId={hosId}
          />
        </SheetContent>
      </Sheet>
    </div>
  )
}
