import ChecklistButton from '@/components/hospital/checklist/checklists/checklist-button'
import type { ChecklistSidebarData } from '@/types/checklist/checklist-type'

type Props = {
  checklistsidebarData: ChecklistSidebarData[]
  handleCloseMobileDrawer?: () => void
}
export default function ChecklistList({
  checklistsidebarData,
  handleCloseMobileDrawer,
}: Props) {
  return (
    <div className="overflow-y-auto">
      <span className="text-xs font-bold text-muted-foreground">
        체크리스트({checklistsidebarData?.length})
      </span>

      <ul className="flex flex-col gap-2">
        {checklistsidebarData.map((list) => (
          <li
            key={list.checklist_id}
            className="w-full last:mb-2"
            onClick={handleCloseMobileDrawer}
          >
            <ChecklistButton checklistchart={list} />
          </li>
        ))}
      </ul>
    </div>
  )
}
