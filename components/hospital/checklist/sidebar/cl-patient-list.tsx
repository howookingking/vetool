import ClPatientButton from '@/components/hospital/checklist/sidebar/cl-patient-button'
import type { ChecklistSidebarData } from '@/lib/services/checklist/fetch-checklist-sidebar-data'

type Props = {
  checklistSidebarData: ChecklistSidebarData[]
  handleCloseMobileDrawer?: () => void
}
export default function ClPatientList({
  checklistSidebarData,
  handleCloseMobileDrawer,
}: Props) {
  return (
    <div className="overflow-y-auto">
      <span className="text-xs font-bold text-muted-foreground">
        체크리스트({checklistSidebarData?.length})
      </span>

      <ul className="flex flex-col gap-2">
        {checklistSidebarData.map((list) => (
          <li
            key={list.checklist_id}
            className="w-full last:mb-2"
            onClick={handleCloseMobileDrawer}
          >
            <ClPatientButton checklistchart={list} />
          </li>
        ))}
      </ul>
    </div>
  )
}
