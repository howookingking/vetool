'use client'

import Filters from '@/components/hospital/icu/sidebar/filters/filters'
import NoPatients from '@/components/hospital/icu/sidebar/no-patients'
import PatientList from '@/components/hospital/icu/sidebar/patient-list'
import { Separator } from '@/components/ui/separator'
import type { IcuSidebarIoData, Vet } from '@/types/icu/chart'
import type { Dispatch, SetStateAction } from 'react'
import { Filter } from './icu-sidebar'

export default function DesktopIcuSidebar({
  filteredData,
  vetsListData,
  hosGroupList,
  isEmpty,
  setFilters,
  filters,
  handleCloseMobileDrawer,
}: {
  filteredData: {
    filteredIcuIoData: IcuSidebarIoData[]
    excludedIcuIoData: IcuSidebarIoData[]
  }
  vetsListData: Vet[]
  hosGroupList: string[]
  isEmpty: boolean
  setFilters: Dispatch<SetStateAction<Filter>>
  filters: Filter
  handleCloseMobileDrawer?: () => void
}) {
  return (
    <aside className="h-icu-chart-main fixed z-20 hidden w-[144px] shrink-0 flex-col gap-3 border-r bg-white p-2 md:flex">
      {isEmpty ? (
        <>
          <NoPatients />
        </>
      ) : (
        <>
          <Filters
            hosGroupList={hosGroupList}
            setFilters={setFilters}
            filters={filters}
            vetsListData={vetsListData}
          />

          <Separator />

          <PatientList
            filteredIcuIoData={filteredData.filteredIcuIoData}
            excludedIcuIoData={filteredData.excludedIcuIoData}
            handleCloseMobileDrawer={handleCloseMobileDrawer}
          />
        </>
      )}
    </aside>
  )
}
