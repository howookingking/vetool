import Filters from '@/components/hospital/icu/sidebar/filters/filters'
import NoPatients from '@/components/hospital/icu/sidebar/no-patients'
import PatientList from '@/components/hospital/icu/sidebar/patient-list'
import { Separator } from '@/components/ui/separator'
import type { Filter, IcuSidebarIoData, Vet } from '@/types/icu/chart'
import type { Dispatch, SetStateAction } from 'react'

export default function MobileSidebar({
  isEmpty,
  setFilters,
  filters,
  hosGroupList,
  handleCloseMobileDrawer,
  filteredData,
  vetsListData,
}: {
  isEmpty: boolean
  setFilters: Dispatch<SetStateAction<Filter>>
  filters: Filter
  hosGroupList: string[]
  handleCloseMobileDrawer?: () => void
  filteredData: {
    filteredIcuIoData: IcuSidebarIoData[]
    excludedIcuIoData: IcuSidebarIoData[]
  }
  vetsListData: Vet[]
}) {
  return (
    <aside className="flex h-full flex-col">
      {isEmpty ? (
        <NoPatients />
      ) : (
        <div className="flex h-full flex-col gap-3 p-2">
          <div className="flex-none">
            <Filters
              hosGroupList={hosGroupList}
              setFilters={setFilters}
              filters={filters}
              vetsListData={vetsListData}
            />
          </div>

          <Separator className="flex-none" />

          <div className="flex-grow overflow-y-auto">
            <PatientList
              filteredIcuIoData={filteredData.filteredIcuIoData}
              excludedIcuIoData={filteredData.excludedIcuIoData}
              vetsListData={vetsListData}
              handleCloseMobileDrawer={handleCloseMobileDrawer}
            />
          </div>
        </div>
      )}
    </aside>
  )
}
