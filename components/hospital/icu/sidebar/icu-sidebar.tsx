'use client'

import DesktopIcuSidebar from '@/components/hospital/icu/sidebar/desktop-icu-sidebar'
import { MobileIcuSidebarSheet } from '@/components/hospital/icu/sidebar/mobile/mobile-icu-sidebar-sheet'
import { DEFAULT_FILTER_STATE } from '@/constants/hospital/icu/chart/filters'
import useLocalStorage from '@/hooks/use-local-storage'
import type { IcuSidebarPatient } from '@/lib/services/icu/icu-layout'
import { filterData } from '@/lib/utils/utils'
import type { Vet } from '@/types'

export default function IcuSidebar({
  hosId,
  icuSidebarPatients,
  vetList,
  hosGroupList,
}: {
  hosId: string
  icuSidebarPatients: IcuSidebarPatient[]
  vetList: Vet[]
  hosGroupList: string[]
}) {
  const [filterState, setFilterState] = useLocalStorage(
    `patientFilter`,
    DEFAULT_FILTER_STATE,
  )
  const filteredData = filterData(icuSidebarPatients, filterState, vetList)

  return (
    <>
      <DesktopIcuSidebar
        hosId={hosId}
        hosGroupList={hosGroupList}
        vetList={vetList}
        filteredData={filteredData}
        isEmpty={icuSidebarPatients.length === 0}
        filters={filterState}
        setFilters={setFilterState}
        currentChartNumber={icuSidebarPatients.length}
      />

      <MobileIcuSidebarSheet
        hosGroupList={hosGroupList}
        vetList={vetList}
        filteredData={filteredData}
        isEmpty={icuSidebarPatients.length === 0}
        filters={filterState}
        setFilters={setFilterState}
      />
    </>
  )
}
