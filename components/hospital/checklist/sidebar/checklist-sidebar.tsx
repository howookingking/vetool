'use client'

import { DEFAULT_FILTER_STATE } from '@/constants/hospital/icu/chart/filters'
import useLocalStorage from '@/hooks/use-local-storage'
import { filterData } from '@/lib/utils/utils'
import type { Vet } from '@/types/icu/chart'
import DesktopChecklistSidebar from '@/components/hospital/checklist/sidebar/desktop-checklist-sidebar'
import type {
  ChecklistSidebarData,
  Filterdcheck,
  FilteredTxChart,
} from '@/types/checklist/checklistchart'
import { MobileChecklistSidebarSheet } from '@/components/hospital/checklist/sidebar/mobile/mobile-checklist-sidebar-sheet'
import { useEffect, useState } from 'react'
import {
  getTodayTxData,
  getTodayTxDataRealtime,
} from '@/lib/services/checklist/get-checklist-data-client'

export default function ChekclistSidebar({
  hosId,
  checklistSidebarData,
  vetsListData,
  hosGroupList,
  targetDate,
}: {
  hosId: string
  checklistSidebarData: Filterdcheck
  vetsListData: Vet[]
  hosGroupList: string[]
  targetDate: string
}) {
  const [filteredTxchart, setFilteredTxChart] =
    useState<FilteredTxChart | null>(null)
  useEffect(() => {
    const fetchData = async () => {
      const data = await getTodayTxData(targetDate, hosId)

      if (data) setFilteredTxChart({ ...data })
    }
    fetchData()
    const channel = getTodayTxDataRealtime(
      targetDate,
      hosId,
      (data: FilteredTxChart) => {
        if (data) fetchData()
      },
    )
  }, [targetDate])
  // const [filterState, setFilterState] = useLocalStorage(
  //   `patientFilter`,
  //   DEFAULT_FILTER_STATE,
  // )
  // const filteredData = filterData(checklistSidebarData, filterState, vetsListData)

  return (
    <>
      <DesktopChecklistSidebar
        hosId={hosId}
        hosGroupList={hosGroupList}
        vetsListData={vetsListData}
        filteredTxData={filteredTxchart && filteredTxchart}
        isEmpty={
          filteredTxchart &&
          filteredTxchart?.today.length +
            filteredTxchart?.todaydone.length +
            filteredTxchart?.ing.length ===
            0
            ? true
            : false
        }
        // filters={filterState}
        // setFilters={setFilterState}
        currentChartNumber={
          checklistSidebarData.todaycheck.length +
          checklistSidebarData.donecheck.length +
          checklistSidebarData.othercheck.length
        }
      />

      <MobileChecklistSidebarSheet
        hosGroupList={hosGroupList}
        vetsListData={vetsListData}
        filteredTxData={filteredTxchart && filteredTxchart}
        isEmpty={
          filteredTxchart &&
          filteredTxchart?.today.length +
            filteredTxchart?.todaydone.length +
            filteredTxchart?.ing.length ===
            0
            ? true
            : false
        }

        // filters={filterState}
        // setFilters={setFilterState}
      />
    </>
  )
}
