import NoResultSquirrel from '@/components/common/no-result-squirrel'
import Filters from '@/components/hospital/icu/sidebar/filters/filters'
import PatientList from '@/components/hospital/icu/sidebar/patient-list'
import { Separator } from '@/components/ui/separator'
import type { Filter, IcuSidebarIoData, Vet } from '@/types/icu/chart'
import { usePathname, useRouter } from 'next/navigation'
import { type Dispatch, type SetStateAction } from 'react'
import IcuDateSelector from './date-selector/icu-date-selector'
import RegisterDialog from './register-dialog/register-dialog'

type DesktopIcuSidebarProps = {
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
}

export default function DesktopIcuSidebar({
  hosId,
  vetsListData,
  hosGroupList,
  filteredData,
  isEmpty,
  setFilters,
  filters,
  handleCloseMobileDrawer,
}: DesktopIcuSidebarProps) {
  const pathname = usePathname()
  const { push } = useRouter()

  const resetFilters = () => {
    setFilters({ selectedGroup: [], selectedVet: '', selectedSort: 'date' })
    push(pathname)
  }

  return (
    <aside className="fixed z-40 hidden h-desktop w-48 shrink-0 flex-col gap-2 border-r bg-white px-2 pb-0 pt-2 2xl:flex">
      <IcuDateSelector />

      <RegisterDialog
        hosId={hosId}
        vetsListData={vetsListData}
        hosGroupList={hosGroupList}
      />

      {isEmpty ? (
        <NoResultSquirrel
          text="입원환자 없음"
          className="mt-20 flex-col"
          size="md"
        />
      ) : (
        <>
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
            resetFilters={resetFilters}
          />

          <Separator />

          <PatientList
            filteredIcuIoData={filteredData.filteredIcuIoData}
            excludedIcuIoData={filteredData.excludedIcuIoData}
            vetsListData={vetsListData}
            handleCloseMobileDrawer={handleCloseMobileDrawer}
          />
        </>
      )}
    </aside>
  )
}
