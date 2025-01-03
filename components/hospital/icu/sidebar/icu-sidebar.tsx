'use client'

import DesktopIcuSidebar from '@/components/hospital/icu/sidebar/desktop-icu-sidebar'
import { MobileIcuSidebarSheet } from '@/components/hospital/icu/sidebar/mobile/mobile-icu-sidebar-sheet'
import useIcuSidebarFilter from '@/hooks/use-icu-sidebar-filter'
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
  const { filters, setFilters } = useIcuSidebarFilter()

  const filteredData = filterData(icuSidebarData, filters, vetsListData)

  return (
    <>
      <DesktopIcuSidebar
        hosId={hosId}
        hosGroupList={hosGroupList}
        vetsListData={vetsListData}
        filteredData={filteredData}
        isEmpty={icuSidebarData.length === 0}
        setFilters={setFilters}
        filters={filters}
      />

      <MobileIcuSidebarSheet
        hosGroupList={hosGroupList}
        vetsListData={vetsListData}
        filteredData={filteredData}
        isEmpty={icuSidebarData.length === 0}
        setFilters={setFilters}
        filters={filters}
      />
    </>
  )
}
