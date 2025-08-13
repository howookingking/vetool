'use client'

import { ChecklistData } from '@/types/checklist/checklist-type'
import DesktopChecklistSidebar from './desktop-checklist-sidebar'
import { MobileChecklistSidebarSheet } from './mobile/mobile-checklist-sidebar-sheet'
import { filterChecklistData } from '@/lib/utils/checklist-utils'

export default function ChecklistSidebar({
  hosId,
  targetDate,
  checklistsidebarData,
}: {
  hosId: string
  targetDate: string
  checklistsidebarData: ChecklistData[]
}) {
  const filteredData = filterChecklistData(checklistsidebarData, targetDate)

  return (
    <>
      <DesktopChecklistSidebar
        hosId={hosId}
        isEmpty={
          filteredData &&
          filteredData?.today.length +
            filteredData?.todaydone.length +
            filteredData?.ing.length ===
            0
            ? true
            : false
        }
        currentChartNumber={0}
        filteredData={filteredData}
      />

      <MobileChecklistSidebarSheet
        isEmpty={
          filteredData &&
          filteredData?.today.length +
            filteredData?.todaydone.length +
            filteredData?.ing.length ===
            0
            ? true
            : false
        }
        filteredData={filteredData}
        hosId={hosId}
      />
    </>
  )
}
