import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { IcuSidebarIoData, Vet } from '@/types/icu/chart'
import { Menu } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { Filter } from '../icu-sidebar'
import MobileSidebar from './mobile-icu-sidebar'

export function MobileIcuSidebarSheet({
  hosGroupList,
  vetsListData,
  filteredData,
  isEmpty,
  setFilters,
  filters,
}: {
  hosGroupList: string[]
  vetsListData: Vet[]
  filteredData: {
    filteredIcuIoData: IcuSidebarIoData[]
    excludedIcuIoData: IcuSidebarIoData[]
  }
  isEmpty: boolean
  setFilters: React.Dispatch<React.SetStateAction<Filter>>
  filters: Filter
}) {
  const { target_date } = useParams()
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const handleCloseMobileDrawer = () => setIsSheetOpen(false)

  return (
    <div className="md:hidden">
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
            <SheetTitle>{target_date}</SheetTitle>
            <SheetDescription />
          </SheetHeader>

          <MobileSidebar
            filteredData={filteredData}
            filters={filters}
            hosGroupList={hosGroupList}
            isEmpty={isEmpty}
            setFilters={setFilters}
            vetsListData={vetsListData}
            handleCloseMobileDrawer={handleCloseMobileDrawer}
          />
        </SheetContent>
      </Sheet>
    </div>
  )
}
