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
  FilteredTxChart,
} from '@/types/checklist/checklistchart'
import ChecklistList from '../chartlist/checklist-list'

type DesktopChecklistSidebarProps = {
  hosId: string
  vetsListData: Vet[]
  hosGroupList: string[]

  isEmpty: boolean
  handleCloseMobileDrawer?: () => void
  // filters: Filter
  // setFilters: (filters: Filter) => void
  currentChartNumber: number

  filteredTxData: FilteredTxChart | null
}

export default function DesktopChecklistSidebar({
  hosId,
  vetsListData,
  hosGroupList,

  isEmpty,
  handleCloseMobileDrawer,
  // filters,
  // setFilters,
  currentChartNumber,

  filteredTxData,
}: DesktopChecklistSidebarProps) {
  return (
    <aside className="fixed z-40 hidden h-desktop w-96 shrink-0 flex-col gap-2 border-r bg-white px-2 pb-0 pt-2 2xl:flex">
      <ChecklistDateSelector />

      <RegisterDialog
        hosId={hosId}
        defaultVetId={vetsListData[0].user_id}
        defaultGroup={hosGroupList[0]}
        currentChartNumber={currentChartNumber}
      />
      <Separator className="my-2" />

      {/* <ChecklistToday
        hosGroupList={hosGroupList}
        filteredData={filteredData}
        handleCloseMobileDrawer={handleCloseMobileDrawer}
        vetsListData={vetsListData}
        targetDate={targetDate}
      /> */}
      {isEmpty ? (
        <NoResultSquirrel
          text="당일 치료 목록 없음"
          className="mt-20 flex-col"
          size="md"
        />
      ) : (
        <ChecklistList
          hosGroupList={hosGroupList}
          handleCloseMobileDrawer={handleCloseMobileDrawer}
          vetsListData={vetsListData}
          filteredTxData={filteredTxData}
        />
      )}
    </aside>
  )
}
