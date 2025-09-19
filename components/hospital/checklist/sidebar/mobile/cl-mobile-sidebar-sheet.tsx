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
import type { ChecklistSidebarData } from '@/lib/services/checklist/fetch-checklist-sidebar-data'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import ClMobileSidebar from './cl-mobile-sidebar'

type Props = {
  checklistSidebarData: ChecklistSidebarData[]
  hosId: string
  targetDate: string
}

export default function ClMobileSidebarSheet({
  checklistSidebarData,
  hosId,
  targetDate,
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
            <VisuallyHidden>
              <SheetTitle />
              <SheetDescription />
            </VisuallyHidden>
          </SheetHeader>

          <ClMobileSidebar
            handleCloseMobileDrawer={handleCloseMobileDrawer}
            checklistSidebarData={checklistSidebarData}
            hosId={hosId}
            targetDate={targetDate}
          />
        </SheetContent>
      </Sheet>
    </div>
  )
}
