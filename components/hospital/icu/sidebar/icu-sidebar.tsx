'use client'

import useIcuSidebarFilter from '@/hooks/use-icu-sidebar-filter'
import type { IcuSidebarIoData, Vet } from '@/types/icu/chart'
import { useCallback, useMemo } from 'react'
import DesktopIcuSidebar from './desktop-icu-sidebar'
import { MobileIcuSidebarSheet } from './mobile/mobile-icu-sidebar-sheet'

export type Filter = {
  selectedGroup: string[]
  selectedVet: string
}

export default function IcuSidebar({
  icuSidebarData,
  vetsListData,
  hosGroupList,
}: {
  icuSidebarData: IcuSidebarIoData[]
  vetsListData: Vet[]
  hosGroupList: string[]
}) {
  const { filters, setFilters } = useIcuSidebarFilter()

  const filterData = useCallback(
    (
      data: IcuSidebarIoData[],
      filters: {
        selectedGroup: string[]
        selectedVet: string
      },
    ) => {
      const filterByGroup = (items: IcuSidebarIoData[]) =>
        filters.selectedGroup.length === 0
          ? items
          : items.filter((item) =>
              filters.selectedGroup.some((group) =>
                item.group_list.includes(group),
              ),
            )

      const filterByVet = (items: IcuSidebarIoData[]) => {
        if (filters.selectedVet === '') return items
        const vetFilteredIds = new Set(
          data
            .filter(
              (chart) =>
                chart.vets?.main_vet === filters.selectedVet ||
                chart.vets?.sub_vet === filters.selectedVet,
            )
            .map((chart) => chart.icu_io_id),
        )

        return items.filter((item) => vetFilteredIds.has(item.icu_io_id))
      }

      const filteredIcuIoData = filterByVet(filterByGroup(data))
      const excludedIcuIoData = data.filter(
        (item) => !filteredIcuIoData.includes(item),
      )

      return { filteredIcuIoData, excludedIcuIoData }
    },
    [],
  )

  const filteredData = useMemo(
    () => filterData(icuSidebarData, filters),
    [filterData, filters, icuSidebarData],
  )

  return (
    <>
      <DesktopIcuSidebar
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
