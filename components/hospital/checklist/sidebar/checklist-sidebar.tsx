import { fetchChecklistSidebarData } from '@/lib/services/checklist/fetch-checklist-sidebar-data'
import DesktopChecklistSidebar from './desktop-checklist-sidebar'
import MobileChecklistSidebarSheet from './mobile/mobile-checklist-sidebar-sheet'

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
      <DesktopChecklistSidebar
        hosId={hosId}
        checklistsidebarData={checklistSidebarData}
      />

      <MobileChecklistSidebarSheet
        checklistsidebarData={checklistSidebarData}
        hosId={hosId}
      />
    </>
  )
}
