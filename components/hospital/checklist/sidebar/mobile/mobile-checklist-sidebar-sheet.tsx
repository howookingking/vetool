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
import type { ChecklistSidebarData } from '@/types/checklist/checklist-type'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import MobieChecklistSidebar from './mobile-checklist-sidebar'
type Props = {
  checklistsidebarData: ChecklistSidebarData[]
  isEmpty: boolean

  hosId: string
}
export function MobileChecklistSidebarSheet({
  isEmpty,
  checklistsidebarData,
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
            <Menu size={24} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-4">
          <SheetHeader>
            <SheetTitle />
            <SheetDescription />
          </SheetHeader>

          <MobieChecklistSidebar
            isEmpty={isEmpty}
            handleCloseMobileDrawer={handleCloseMobileDrawer}
            checklistsidebarData={checklistsidebarData}
            hosId={hosId}
          />
        </SheetContent>
      </Sheet>
    </div>
  )
}
