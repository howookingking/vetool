import NoResultSquirrel from '@/components/common/no-result-squirrel'
import IcuDateSelector from '@/components/hospital/icu/sidebar/date-selector/icu-date-selector'
import Filters from '@/components/hospital/icu/sidebar/filters/filters'
import PatientList from '@/components/hospital/icu/sidebar/patient-list/patient-list'
import { Separator } from '@/components/ui/separator'
import { Filterdcheck } from '@/types/checklist/checklistchart'
import type { Filter, IcuSidebarIoData, Vet } from '@/types/icu/chart'
import type { Dispatch, SetStateAction } from 'react'
import ChecklistList from '../../chartlist/checklist-list'

type MobileChecklistSidebarProps = {
  isEmpty: boolean
  //   setFilters: Dispatch<SetStateAction<Filter>>
  //   filters: Filter
  hosGroupList: string[]
  handleCloseMobileDrawer?: () => void
  filteredData: Filterdcheck
  vetsListData: Vet[]
}

export default function MobileChecklistSidebar({
  isEmpty,
  //   setFilters,
  //   filters,
  hosGroupList,
  handleCloseMobileDrawer,
  filteredData,
  vetsListData,
}: MobileChecklistSidebarProps) {
  return (
    <aside className="flex h-full flex-col">
      {isEmpty ? (
        <NoResultSquirrel
          text="당일 치료 목록 없음"
          className="mt-10 flex-col"
        />
      ) : (
        <>
          <IcuDateSelector />
          <ChecklistList
            filteredData={filteredData}
            hosGroupList={hosGroupList}
            handleCloseMobileDrawer={handleCloseMobileDrawer}
            vetsListData={vetsListData}
          />
        </>
      )}
    </aside>
  )
}
