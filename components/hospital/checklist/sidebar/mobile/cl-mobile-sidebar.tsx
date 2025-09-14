import NoResultSquirrel from '@/components/common/no-result-squirrel'
import ClPatientList from '@/components/hospital/checklist/sidebar/cl-patient-list'
import ClDateSelector from '@/components/hospital/checklist/sidebar/date-selector/cl-date-selector'
import { Separator } from '@/components/ui/separator'
import type { ChecklistSidebarData } from '@/types/checklist/checklist-type'

type Props = {
  checklistSidebarData: ChecklistSidebarData[]
  handleCloseMobileDrawer?: () => void
  hosId: string
  targetDate: string
}

export default function ClMobileSidebar({
  checklistSidebarData,
  handleCloseMobileDrawer,
  hosId,
  targetDate,
}: Props) {
  return (
    <aside className="flex h-full flex-col">
      <div className="flex h-full flex-col gap-3 p-2">
        <ClDateSelector hosId={hosId} targetDate={targetDate} />

        {/* <ChecklistRegisterDialog hosId={hosId} /> */}

        <Separator />

        {checklistSidebarData.length === 0 ? (
          <NoResultSquirrel
            text="체크리스트 환자 없음"
            size="md"
            className="mt-20 flex-col"
          />
        ) : (
          <ClPatientList
            checklistSidebarData={checklistSidebarData}
            handleCloseMobileDrawer={handleCloseMobileDrawer}
          />
        )}
      </div>
    </aside>
  )
}
