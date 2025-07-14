import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useState } from 'react'
import { Menu } from 'lucide-react'
import MobieChecklistSidebar from './mobile-checklist-sidebar'
import type {
  ChecklistData,
  FilteredChecklist,
} from '@/types/checklist/checklist-type'
export function MobileChecklistSidebarSheet({
  isEmpty,
  filteredData,
  hosId,
}: {
  isEmpty: boolean
  filteredData?: FilteredChecklist
  hosId: string
}) {
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
            filteredData={filteredData}
            hosId={hosId}
          />
        </SheetContent>
      </Sheet>
    </div>
  )
}
