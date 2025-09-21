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
import type { Filter } from '@/types/icu/chart'
import { Menu } from 'lucide-react'
import { useState } from 'react'

type Props = {
  hosGroupList: string[]
  vetList: Vet[]
  filteredData: {
    filteredIcuIoData: IcuSidebarPatient[]
    excludedIcuIoData: IcuSidebarPatient[]
    filteredIoPatientCount: number
  }
  isEmpty: boolean
  setFilters: React.Dispatch<React.SetStateAction<Filter>>
  filters: Filter
}

export function MobileIcuSidebarSheet({
  hosGroupList,
  vetList,
  filteredData,
  isEmpty,
  setFilters,
  filters,
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

          <MobileSidebar
            filteredData={filteredData}
            filters={filters}
            hosGroupList={hosGroupList}
            isEmpty={isEmpty}
            setFilters={setFilters}
            vetList={vetList}
            handleCloseMobileDrawer={handleCloseMobileDrawer}
          />
        </SheetContent>
      </Sheet>
    </div>
  )
}
