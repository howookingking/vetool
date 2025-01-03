import Filters from '@/components/hospital/icu/sidebar/filters/filters'
import NoPatients from '@/components/hospital/icu/sidebar/no-patients'
import PatientList from '@/components/hospital/icu/sidebar/patient-list'
import { Separator } from '@/components/ui/separator'
import type { Filter, IcuSidebarIoData, Vet } from '@/types/icu/chart'
import type { Dispatch, SetStateAction } from 'react'
import HeaderDateSelector from '../../header/date-picker/header-date-selector'
import { usePathname, useRouter } from 'next/navigation'

export default function MobileSidebar({
  isEmpty,
  setFilters,
  filters,
  hosGroupList,
  handleCloseMobileDrawer,
  filteredData,
  vetsListData,
}: {
  isEmpty: boolean
  setFilters: Dispatch<SetStateAction<Filter>>
  filters: Filter
  hosGroupList: string[]
  handleCloseMobileDrawer?: () => void
  filteredData: {
    filteredIcuIoData: IcuSidebarIoData[]
    excludedIcuIoData: IcuSidebarIoData[]
  }
  vetsListData: Vet[]
}) {
  const pathname = usePathname()
  const { push } = useRouter()

  const resetFilters = () => {
    setFilters({ selectedGroup: [], selectedVet: '', selectedSort: 'date' })

    push(pathname)
  }

  return (
    <aside className="flex h-full flex-col">
      {isEmpty ? (
        <NoPatients />
      ) : (
        <div className="flex h-full flex-col gap-3 p-2">
          <div className="flex-none">
            <HeaderDateSelector />

            <Filters
              hosGroupList={hosGroupList}
              vetsListData={vetsListData}
              selectedGroup={filters.selectedGroup}
              setSelectedGroup={(group) =>
                setFilters({ ...filters, selectedGroup: group })
              }
              selectedVet={filters.selectedVet}
              setSelectedVet={(vet) =>
                setFilters({ ...filters, selectedVet: vet })
              }
              selectedSort={filters.selectedSort}
              setSelectedSort={(sort) =>
                setFilters({ ...filters, selectedSort: sort })
              }
            />
          </div>

          <Separator className="flex-none" />

          <div className="flex-grow overflow-y-auto">
            <PatientList
              filteredIcuIoData={filteredData.filteredIcuIoData}
              excludedIcuIoData={filteredData.excludedIcuIoData}
              vetsListData={vetsListData}
              handleCloseMobileDrawer={handleCloseMobileDrawer}
              resetFilters={resetFilters}
            />
          </div>
        </div>
      )}
    </aside>
  )
}
