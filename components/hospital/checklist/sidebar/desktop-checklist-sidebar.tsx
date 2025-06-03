import NoResultSquirrel from '@/components/common/no-result-squirrel'
import IcuDateSelector from '@/components/hospital/icu/sidebar/date-selector/icu-date-selector'
import Filters from '@/components/hospital/icu/sidebar/filters/filters'
import PatientList from '@/components/hospital/icu/sidebar/patient-list/patient-list'
import RegisterDialog from '@/components/hospital/icu/sidebar/register-dialog/register-dialog'
import { Separator } from '@/components/ui/separator'
import { type Filter, type IcuSidebarIoData, type Vet } from '@/types/icu/chart'
import ChecklistDateSelector from '@/components/hospital/checklist/sidebar/date-selector/checklist-date-selector'
import {
  ChecklistSidebarData,
  Filterdcheck,
} from '@/types/checklist/checklistchart'
import ChecklistList from '../chartlist/checklist-list'

type DesktopChecklistSidebarProps = {
  hosId: string
  vetsListData: Vet[]
  hosGroupList: string[]
  filteredData: Filterdcheck
  isEmpty: boolean
  handleCloseMobileDrawer?: () => void
  // filters: Filter
  // setFilters: (filters: Filter) => void
  currentChartNumber: number
}

export default function DesktopChecklistSidebar({
  hosId,
  vetsListData,
  hosGroupList,
  filteredData,
  isEmpty,
  handleCloseMobileDrawer,
  // filters,
  // setFilters,
  currentChartNumber,
}: DesktopChecklistSidebarProps) {
  return (
    <aside className="fixed z-40 hidden h-desktop w-48 shrink-0 flex-col gap-2 border-r bg-white px-2 pb-0 pt-2 2xl:flex">
      <ChecklistDateSelector />

      <RegisterDialog
        hosId={hosId}
        defaultVetId={vetsListData[0].user_id}
        defaultGroup={hosGroupList[0]}
        currentChartNumber={currentChartNumber}
      />

      {isEmpty ? (
        <NoResultSquirrel
          text="당일 치료 목록 없음"
          className="mt-20 flex-col"
          size="md"
        />
      ) : (
        <ChecklistList
          filteredData={filteredData}
          hosGroupList={hosGroupList}
          handleCloseMobileDrawer={handleCloseMobileDrawer}
          vetsListData={vetsListData}
        />
      )}
    </aside>
  )
}
