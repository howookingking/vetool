import NoResultSquirrel from '@/components/common/no-result-squirrel'
import ChecklistDateSelector from './date-selector/checklist-date-selector'
import ChecklistRegisterDialog from '@/components/hospital/checklist/sidebar/checklist-register-dialog/checklist-register-dialog'
import type {
  ChecklistData,
  FilteredChecklist,
} from '@/types/checklist/checklist-type'
import ChecklistList from '@/components/hospital/checklist/checklists/checklist-list'
import { Separator } from '@/components/ui/separator'

type ChecklistIcuSidebarProps = {
  hosId: string
  isEmpty: boolean
  currentChartNumber: number
  filteredData?: FilteredChecklist
  handleCloseMobileDrawer?: () => void
}
export default function DesktopChecklistSidebar({
  hosId,
  isEmpty,
  currentChartNumber,
  filteredData,
  handleCloseMobileDrawer,
}: ChecklistIcuSidebarProps) {
  return (
    <aside className="fixed z-40 hidden h-desktop w-96 shrink-0 flex-col gap-2 border-r bg-white px-2 pb-0 pt-2 2xl:flex">
      <ChecklistDateSelector />
      <ChecklistRegisterDialog hosId={hosId} checklistData={null} />
      {isEmpty ? (
        <NoResultSquirrel
          text="👆 환자를 선택해주세요"
          className="mt-20 flex-col"
          size="md"
        />
      ) : (
        <>
          <Separator />
          <ChecklistList
            filteredData={filteredData}
            handleCloseMobileDrawer={handleCloseMobileDrawer}
          />
        </>
      )}
    </aside>
  )
}
