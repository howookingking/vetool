'use client'

import { DEFAULT_FILTER_STATE } from '@/constants/hospital/icu/chart/filters'
import useLocalStorage from '@/hooks/use-local-storage'
import { filterData } from '@/lib/utils/utils'
import type { Vet } from '@/types/icu/chart'
import DesktopChecklistSidebar from '@/components/hospital/checklist/sidebar/desktop-checklist-sidebar'
import type {
  ChecklistSidebarData,
  Filterdcheck,
} from '@/types/checklist/checklistchart'
import { MobileChecklistSidebarSheet } from '@/components/hospital/checklist/sidebar/mobile/mobile-checklist-sidebar-sheet'

export default function ChekclistSidebar({
  hosId,
  checklistSidebarData,
  vetsListData,
  hosGroupList,
}: {
  hosId: string
  checklistSidebarData: Filterdcheck
  vetsListData: Vet[]
  hosGroupList: string[]
}) {
  // const [filterState, setFilterState] = useLocalStorage(
  //   `patientFilter`,
  //   DEFAULT_FILTER_STATE,
  // )
  // const filteredData = filterData(checklistSidebarData, filterState, vetsListData)

  return (
    <>
      <DesktopChecklistSidebar
        hosId={hosId}
        hosGroupList={hosGroupList}
        vetsListData={vetsListData}
        filteredData={checklistSidebarData}
        isEmpty={
          checklistSidebarData.todaycheck.length +
            checklistSidebarData.donecheck.length +
            checklistSidebarData.othercheck.length ===
          0
        }
        // filters={filterState}
        // setFilters={setFilterState}
        currentChartNumber={
          checklistSidebarData.todaycheck.length +
          checklistSidebarData.donecheck.length +
          checklistSidebarData.othercheck.length
        }
      />

      <MobileChecklistSidebarSheet
        hosGroupList={hosGroupList}
        vetsListData={vetsListData}
        filteredData={checklistSidebarData}
        isEmpty={
          checklistSidebarData.todaycheck.length +
            checklistSidebarData.donecheck.length +
            checklistSidebarData.othercheck.length ===
          0
        }
        // filters={filterState}
        // setFilters={setFilterState}
      />
    </>
  )
}
