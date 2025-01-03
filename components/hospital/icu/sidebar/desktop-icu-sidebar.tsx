import HeaderDateSelector from '@/components/hospital/icu/header/date-picker/header-date-selector'
import RegisterDialog from '@/components/hospital/icu/header/register-dialog/register-dialog'
import Filters from '@/components/hospital/icu/sidebar/filters/filters'
import NoPatients from '@/components/hospital/icu/sidebar/no-patients'
import PatientList from '@/components/hospital/icu/sidebar/patient-list'
import { Separator } from '@/components/ui/separator'
import type { Filter, IcuSidebarIoData, Vet } from '@/types/icu/chart'
import { usePathname, useRouter } from 'next/navigation'
import { type Dispatch, type SetStateAction } from 'react'

export default function DesktopIcuSidebar({
  hosId,
  vetsListData,
  hosGroupList,
  filteredData,
  isEmpty,
  setFilters,
  filters,
  handleCloseMobileDrawer,
}: {
  hosId: string
  vetsListData: Vet[]
  hosGroupList: string[]
  filteredData: {
    filteredIcuIoData: IcuSidebarIoData[]
    excludedIcuIoData: IcuSidebarIoData[]
  }
  isEmpty: boolean
  setFilters: Dispatch<SetStateAction<Filter>>
  filters: Filter
  handleCloseMobileDrawer?: () => void
}) {
  const pathname = usePathname()
  const { push } = useRouter()

  const resetFilters = () => {
    setFilters({ selectedGroup: [], selectedVet: '', selectedSort: 'date' })

    push(pathname)
  }

  return (
    <aside className="fixed z-40 hidden h-full w-48 shrink-0 flex-col gap-3 border-r bg-white p-2 2xl:flex">
      {isEmpty ? (
        <>
          <NoPatients />
        </>
      ) : (
        <>
          <HeaderDateSelector />

          <RegisterDialog
            hosId={hosId}
            vetsListData={vetsListData}
            hosGroupList={hosGroupList}
          />

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

          <Separator />

          <PatientList
            filteredIcuIoData={filteredData.filteredIcuIoData}
            excludedIcuIoData={filteredData.excludedIcuIoData}
            vetsListData={vetsListData}
            handleCloseMobileDrawer={handleCloseMobileDrawer}
            resetFilters={resetFilters}
          />
        </>
      )}
    </aside>
  )
}
