import NoResultSquirrel from '@/components/common/no-result-squirrel'
import IcuDateSelector from '@/components/hospital/icu/sidebar/date-selector/icu-date-selector'
import { Separator } from '@/components/ui/separator'
import ChecklistList from '@/components/hospital/checklist/checklists/checklist-list'
import type { FilteredChecklist } from '@/types/checklist/checklist-type'
import ChecklistDateSelector from '@/components/hospital/checklist/sidebar/date-selector/checklist-date-selector'
import ChecklistRegisterDialog from '@/components/hospital/checklist/sidebar/checklist-register-dialog/checklist-register-dialog'
type MobileChecklistSidebarProps = {
  isEmpty: boolean
  filteredData?: FilteredChecklist
  handleCloseMobileDrawer?: () => void
  hosId: string
}

export default function MobieChecklistSidebar({
  isEmpty,
  filteredData,
  handleCloseMobileDrawer,
  hosId,
}: MobileChecklistSidebarProps) {
  return (
    <aside className="flex h-full flex-col">
      {isEmpty ? (
        <div className="flex h-full flex-col gap-3 p-2">
          <ChecklistDateSelector />
          {/* <ChecklistRegisterDialog hosId={hosId} /> */}
          <Separator />
          <NoResultSquirrel
            text="입원환자가 없습니다"
            className="mt-10 flex-col"
          />
        </div>
      ) : (
        <div className="flex h-full flex-col gap-3 p-2">
          <ChecklistDateSelector />
          {/* <ChecklistRegisterDialog hosId={hosId} /> */}
          <Separator />
          <ChecklistList
            filteredData={filteredData}
            handleCloseMobileDrawer={handleCloseMobileDrawer}
          />
        </div>
      )}
    </aside>
  )
}
