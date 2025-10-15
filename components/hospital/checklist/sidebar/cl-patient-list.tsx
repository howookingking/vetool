import ClPatientButton from '@/components/hospital/checklist/sidebar/cl-patient-button'
import type { ChecklistSidebarData } from '@/lib/services/checklist/fetch-checklist-sidebar-data'

type Props = {
  checklistSidebarData: ChecklistSidebarData[]
  handleCloseMobileDrawer?: () => void
  hosId: string
  targetDate: string
}
export default function ClPatientList({
  checklistSidebarData,
  handleCloseMobileDrawer,
  hosId,
  targetDate,
}: Props) {
  return (
    <div className="overflow-y-auto">
      <ul className="flex flex-col gap-2">
        <li className="text-xs font-bold">
          체크리스트({checklistSidebarData?.length})
        </li>

        {checklistSidebarData.map((list) => (
          <li
            key={list.checklist_id}
            className="w-full last:mb-2"
            onClick={handleCloseMobileDrawer}
          >
            <ClPatientButton
              checklistchart={list}
              hosId={hosId}
              targetDate={targetDate}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
