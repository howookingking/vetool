import NoResultSquirrel from '@/components/common/no-result-squirrel'
import Filters from '@/components/hospital/icu/sidebar/filters/filters'
import PatientList from '@/components/hospital/icu/sidebar/patient-list'
import { Separator } from '@/components/ui/separator'
import type { Filter, IcuSidebarIoData, Vet } from '@/types/icu/chart'
import { usePathname, useRouter } from 'next/navigation'
import type { Dispatch, SetStateAction } from 'react'
import IcuDateSelector from '../date-selector/icu-date-selector'

type MobileSidebarProps = {
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
}

export default function MobileSidebar({
  isEmpty,
  setFilters,
  filters,
  hosGroupList,
  handleCloseMobileDrawer,
  filteredData,
  vetsListData,
}: MobileSidebarProps) {
  const pathname = usePathname()
  const { push } = useRouter()

  const resetFilters = () => {
    setFilters({ selectedGroup: [], selectedVet: '', selectedSort: 'date' })
    push(pathname)
  }

  return (
    <aside className="flex h-full flex-col">
      {isEmpty ? (
        <NoResultSquirrel
          text="입원환자가 없습니다"
          className="mt-10 flex-col"
        />
      ) : (
        <div className="flex h-full flex-col gap-3 p-2">
          <IcuDateSelector />

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
        </div>
      )}
    </aside>
  )
}
