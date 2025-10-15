import { fetchChecklistSidebarData } from '@/lib/services/checklist/fetch-checklist-sidebar-data'
import ClDesktopSidebar from './cl-desktop-sidebar'
import ClMobileSidebarSheet from './mobile/cl-mobile-sidebar-sheet'

type Props = {
  hosId: string
  targetDate: string
}
export default async function ChecklistSidebar({ hosId, targetDate }: Props) {
  const checklistSidebarData = await fetchChecklistSidebarData(
    hosId,
    targetDate,
  )

  return (
    <>
      <ClDesktopSidebar
        hosId={hosId}
        targetDate={targetDate}
        checklistSidebarData={checklistSidebarData}
      />

      {/* <ClMobileSidebarSheet
        hosId={hosId}
        targetDate={targetDate}
        checklistSidebarData={checklistSidebarData}
      /> */}
    </>
  )
}
