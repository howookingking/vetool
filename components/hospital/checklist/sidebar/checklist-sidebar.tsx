'use client'

import type { ChecklistSidebarData } from '@/types/checklist/checklist-type'
import DesktopChecklistSidebar from './desktop-checklist-sidebar'
import { MobileChecklistSidebarSheet } from './mobile/mobile-checklist-sidebar-sheet'

type Props = {
  hosId: string
  targetDate: string
  checklistsidebarData: ChecklistSidebarData[]
}
export default function ChecklistSidebar({
  hosId,
  checklistsidebarData,
}: Props) {
  return (
    <>
      <DesktopChecklistSidebar
        hosId={hosId}
        isEmpty={
          checklistsidebarData && checklistsidebarData.length === 0
            ? true
            : false
        }
        currentChartNumber={0}
        checklistsidebarData={checklistsidebarData}
      />

      <MobileChecklistSidebarSheet
        isEmpty={
          checklistsidebarData && checklistsidebarData.length === 0
            ? true
            : false
        }
        checklistsidebarData={checklistsidebarData}
        hosId={hosId}
      />
    </>
  )
}
