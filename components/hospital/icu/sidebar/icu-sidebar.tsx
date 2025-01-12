'use client'

import DesktopIcuSidebar from '@/components/hospital/icu/sidebar/desktop-icu-sidebar'
import { MobileIcuSidebarSheet } from '@/components/hospital/icu/sidebar/mobile/mobile-icu-sidebar-sheet'
import { DEFAULT_FILTER_STATE } from '@/constants/hospital/icu/chart/filters'
import useLocalStorage from '@/hooks/use-local-storage'
import { filterData } from '@/lib/utils/utils'
import type { IcuSidebarIoData, Vet } from '@/types/icu/chart'

export default function IcuSidebar({
  hosId,
  icuSidebarData,
  vetsListData,
  hosGroupList,
}: {
  hosId: string
  icuSidebarData: IcuSidebarIoData[]
  vetsListData: Vet[]
  hosGroupList: string[]
}) {
  const [filterState, setFilterState] = useLocalStorage(
    `patientFilter`,
    DEFAULT_FILTER_STATE,
  )
  const filteredData = filterData(icuSidebarData, filterState, vetsListData)

  return (
    <>
      <DesktopIcuSidebar
        hosId={hosId}
        hosGroupList={hosGroupList}
        vetsListData={vetsListData}
        filteredData={filteredData}
        isEmpty={icuSidebarData.length === 0}
        filters={filterState}
        setFilters={setFilterState}
      />

      <MobileIcuSidebarSheet
        hosGroupList={hosGroupList}
        vetsListData={vetsListData}
        filteredData={filteredData}
        isEmpty={icuSidebarData.length === 0}
        filters={filterState}
        setFilters={setFilterState}
      />
    </>
  )
}
