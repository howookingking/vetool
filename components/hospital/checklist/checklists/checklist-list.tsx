import { Separator } from '@/components/ui/separator'
import type { ChecklistSidebarData } from '@/types/checklist/checklist-type'
import ChecklistButton from '@/components/hospital/checklist/checklists/checklist-button'

type Props = {
  checklistsidebarData?: ChecklistSidebarData[]
  handleCloseMobileDrawer?: () => void
}
export default function ChecklistList({
  checklistsidebarData,
  handleCloseMobileDrawer,
}: Props) {
  return (
    <div className="flex h-full flex-col gap-3 p-2">
      <div className="flex items-center justify-between text-xs font-bold text-muted-foreground">
        <span className="font-bold">
          당일 체크리스트({checklistsidebarData?.length})
        </span>
      </div>
      {checklistsidebarData &&
        checklistsidebarData.map((list) => (
          <div
            key={list.checklist_id}
            className="w-full last:mb-2"
            onClick={handleCloseMobileDrawer}
          >
            <ChecklistButton checklistchart={list} />
          </div>
        ))}
      <Separator />
    </div>
  )
}
