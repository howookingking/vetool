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
import { Filterdcheck, FilteredTxChart } from '@/types/checklist/checklistchart'
import type { Filter, IcuSidebarIoData, Vet } from '@/types/icu/chart'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import MobileChecklistSidebar from '@/components/hospital/checklist/sidebar/mobile/mobile-checklist-sidebar'

export function MobileChecklistSidebarSheet({
  hosGroupList,
  vetsListData,
  isEmpty,
  filteredTxData,
  //   setFilters,
  //   filters,
}: {
  hosGroupList: string[]
  vetsListData: Vet[]
  isEmpty: boolean
  filteredTxData: FilteredTxChart | null
  //   setFilters: React.Dispatch<React.SetStateAction<Filter>>
  //   filters: Filter
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

          <MobileChecklistSidebar
            filteredTxData={filteredTxData}
            // filters={filters}
            hosGroupList={hosGroupList}
            isEmpty={isEmpty}
            // setFilters={setFilters}
            vetsListData={vetsListData}
            handleCloseMobileDrawer={handleCloseMobileDrawer}
          />
        </SheetContent>
      </Sheet>
    </div>
  )
}
