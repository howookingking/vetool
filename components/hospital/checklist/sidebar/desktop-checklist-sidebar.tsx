import NoResultSquirrel from '@/components/common/no-result-squirrel'
import ChecklistList from '@/components/hospital/checklist/checklists/checklist-list'
import ChecklistRegisterDialog from '@/components/hospital/checklist/sidebar/checklist-register-dialog/checklist-register-dialog'
import { Separator } from '@/components/ui/separator'
import type { ChecklistSidebarData } from '@/types/checklist/checklist-type'
import ChecklistDateSelector from './date-selector/checklist-date-selector'

type Props = {
  hosId: string
  targetDate: string
  checklistsidebarData: ChecklistSidebarData[]
  handleCloseMobileDrawer?: () => void
}
export default function DesktopChecklistSidebar({
  hosId,
  targetDate,
  checklistsidebarData,
  handleCloseMobileDrawer,
}: Props) {
  return (
    <aside className="fixed z-40 hidden h-desktop w-96 shrink-0 flex-col gap-2 border-r bg-white px-2 pb-0 pt-2 2xl:flex">
      <ChecklistDateSelector hosId={hosId} targetDate={targetDate} />

      <ChecklistRegisterDialog hosId={hosId} checklistData={null} />

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
    </aside>
  )
}
