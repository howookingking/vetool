import { Separator } from '@/components/ui/separator'
import type { IcuSidebarIoData, Vet } from '@/types/icu/chart'
import type { Dispatch, SetStateAction } from 'react'
import Filters from '../filters/filters'
import type { Filter } from '../icu-sidebar'
import NoPatients from '../no-patients'
import PatientList from '../patient-list'

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
    <aside className="flex flex-col gap-3 p-2">
      {isEmpty ? (
        <NoPatients />
      ) : (
        <>
          <Filters
            hosGroupList={hosGroupList}
            setFilters={setFilters}
            filters={filters}
            vetsListData={vetsListData}
          />

          <Separator />

          <PatientList
            filteredIcuIoData={filteredData.filteredIcuIoData}
            excludedIcuIoData={filteredData.excludedIcuIoData}
            handleCloseMobileDrawer={handleCloseMobileDrawer}
          />
        </>
      )}
    </aside>
  )
}
