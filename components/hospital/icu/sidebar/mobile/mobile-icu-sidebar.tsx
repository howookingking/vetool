import NoResultSquirrel from '@/components/common/no-result-squirrel'
import IcuDateSelector from '@/components/hospital/icu/sidebar/date-selector/icu-date-selector'
import Filters from '@/components/hospital/icu/sidebar/filters/filters'
import PatientList from '@/components/hospital/icu/sidebar/patient-list/patient-list'
import { Separator } from '@/components/ui/separator'
import type { Filter, IcuSidebarIoData, Vet } from '@/types/icu/chart'
import type { Dispatch, SetStateAction } from 'react'

type MobileSidebarProps = {
  isEmpty: boolean
  setFilters: Dispatch<SetStateAction<Filter>>
  filters: Filter
  hosGroupList: string[]
  handleCloseMobileDrawer?: () => void
  filteredData: {
    filteredIcuIoData: IcuSidebarIoData[]
    excludedIcuIoData: IcuSidebarIoData[]
    filteredIoPatientCount: number
  }
  vetsListData: Vet[]
}

export default function MobileSidebar({
  isEmpty,
  setFilters,
  filters,
  hosGroupList,
  handleCloseMobileDrawer,
  filteredData,
  vetsListData,
}: MobileSidebarProps) {
  return (
    <aside className="flex h-full flex-col">
      {isEmpty ? (
        <NoResultSquirrel
          text="입원환자가 없습니다"
          className="mt-10 flex-col"
        />
      ) : (
        <div className="flex h-full flex-col gap-3 p-2">
          <IcuDateSelector />

          <Filters
            hosGroupList={hosGroupList}
            vetsListData={vetsListData}
            filters={filters}
            setFilters={setFilters}
          />

          <Separator />

          <PatientList
            filteredData={filteredData}
            vetsListData={vetsListData}
            handleCloseMobileDrawer={handleCloseMobileDrawer}
          />
        </div>
      )}
    </aside>
  )
}
