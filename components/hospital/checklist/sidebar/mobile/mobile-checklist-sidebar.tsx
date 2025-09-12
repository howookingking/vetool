import NoResultSquirrel from '@/components/common/no-result-squirrel'
import ChecklistList from '@/components/hospital/checklist/checklists/checklist-list'
import ChecklistDateSelector from '@/components/hospital/checklist/sidebar/date-selector/checklist-date-selector'
import { Separator } from '@/components/ui/separator'
import type { ChecklistSidebarData } from '@/types/checklist/checklist-type'

type MobileChecklistSidebarProps = {
  checklistsidebarData: ChecklistSidebarData[]
  handleCloseMobileDrawer?: () => void
  hosId: string
  targetDate: string
}

export default function MobileChecklistSidebar({
  checklistsidebarData,
  handleCloseMobileDrawer,
  hosId,
  targetDate,
}: MobileChecklistSidebarProps) {
  return (
    <aside className="flex h-full flex-col">
      <div className="flex h-full flex-col gap-3 p-2">
        <ChecklistDateSelector hosId={hosId} targetDate={targetDate} />

        {/* <ChecklistRegisterDialog hosId={hosId} /> */}

        <Separator />

        {checklistsidebarData.length === 0 ? (
          <NoResultSquirrel
            text="체크리스트 환자 없음"
            size="md"
            className="mt-20 flex-col"
          />
        ) : (
          <ChecklistList
            checklistsidebarData={checklistsidebarData}
            handleCloseMobileDrawer={handleCloseMobileDrawer}
          />
        )}
      </div>
    </aside>
  )
}
