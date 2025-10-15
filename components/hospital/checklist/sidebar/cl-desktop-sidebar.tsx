import NoResultSquirrel from '@/components/common/no-result-squirrel'
import ClRegisterDialog from '@/components/hospital/checklist/sidebar/checklist-register-dialog/cl-register-dialog'
import ClPatientList from '@/components/hospital/checklist/sidebar/cl-patient-list'
import { Separator } from '@/components/ui/separator'
import type { ChecklistSidebarData } from '@/lib/services/checklist/fetch-checklist-sidebar-data'
import ClEmergencyDialog from './cl-emergency-dialog'
import ClDateSelector from './date-selector/cl-date-selector'

type Props = {
  hosId: string
  targetDate: string
  checklistSidebarData: ChecklistSidebarData[]
  handleCloseMobileDrawer?: () => void
}
export default function ClDesktopSidebar({
  hosId,
  targetDate,
  checklistSidebarData,
  handleCloseMobileDrawer,
}: Props) {
  return (
    <aside className="fixed z-40 hidden h-desktop w-48 shrink-0 flex-col gap-2 border-r bg-white px-2 pb-0 pt-2 2xl:flex">
      <ClDateSelector hosId={hosId} targetDate={targetDate} />

      <div className="flex flex-col gap-2">
        <ClRegisterDialog hosId={hosId} targetDate={targetDate} />

        <ClEmergencyDialog hosId={hosId} targetDate={targetDate} />
      </div>

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
          hosId={hosId}
          targetDate={targetDate}
        />
      )}
    </aside>
  )
}
