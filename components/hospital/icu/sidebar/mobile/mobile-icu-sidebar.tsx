import NoResultSquirrel from '@/components/common/no-result-squirrel'
import IcuDateSelector from '@/components/hospital/icu/sidebar/date-selector/icu-date-selector'
import Filters from '@/components/hospital/icu/sidebar/filters/filters'
import PatientList from '@/components/hospital/icu/sidebar/patient-list/patient-list'
import { Separator } from '@/components/ui/separator'
import type { IcuSidebarPatient } from '@/lib/services/icu/icu-layout'
import type { Vet } from '@/types'
import type { Filter } from '@/types/icu/chart'
import type { Dispatch, SetStateAction } from 'react'

type Props = {
  isEmpty: boolean
  setFilters: Dispatch<SetStateAction<Filter>>
  filters: Filter
  hosGroupList: string[]
  handleCloseMobileDrawer?: () => void
  filteredData: {
    filteredIcuIoData: IcuSidebarPatient[]
    excludedIcuIoData: IcuSidebarPatient[]
    filteredIoPatientCount: number
  }
  vetList: Vet[]
}

export default function MobileSidebar({
  isEmpty,
  setFilters,
  filters,
  hosGroupList,
  handleCloseMobileDrawer,
  filteredData,
  vetList,
}: Props) {
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
            vetList={vetList}
            filters={filters}
            setFilters={setFilters}
          />

          <Separator />

          <PatientList
            filteredData={filteredData}
            vetList={vetList}
            handleCloseMobileDrawer={handleCloseMobileDrawer}
          />
        </div>
      )}
    </aside>
  )
}
