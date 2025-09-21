import NoResultSquirrel from '@/components/common/no-result-squirrel'
import IcuDateSelector from '@/components/hospital/icu/sidebar/date-selector/icu-date-selector'
import Filters from '@/components/hospital/icu/sidebar/filters/filters'
import PatientList from '@/components/hospital/icu/sidebar/patient-list/patient-list'
import RegisterDialog from '@/components/hospital/icu/sidebar/register-dialog/register-dialog'
import { Separator } from '@/components/ui/separator'
import type { IcuSidebarPatient } from '@/lib/services/icu/icu-layout'
import type { Vet } from '@/types'
import type { Filter } from '@/types/icu/chart'

type DesktopIcuSidebarProps = {
  hosId: string
  vetList: Vet[]
  hosGroupList: string[]
  filteredData: {
    filteredIcuIoData: IcuSidebarPatient[]
    excludedIcuIoData: IcuSidebarPatient[]
    filteredIoPatientCount: number
  }
  isEmpty: boolean
  handleCloseMobileDrawer?: () => void
  filters: Filter
  setFilters: (filters: Filter) => void
  currentChartNumber: number
}

export default function DesktopIcuSidebar({
  hosId,
  vetList,
  hosGroupList,
  filteredData,
  isEmpty,
  handleCloseMobileDrawer,
  filters,
  setFilters,
  currentChartNumber,
}: DesktopIcuSidebarProps) {
  return (
    <aside className="fixed z-40 hidden h-desktop w-48 shrink-0 flex-col gap-2 border-r bg-white px-2 pb-0 pt-2 2xl:flex">
      <IcuDateSelector />

      <RegisterDialog
        hosId={hosId}
        defaultVetId={vetList[0].user_id}
        defaultGroup={hosGroupList[0]}
        currentChartNumber={currentChartNumber}
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
        </>
      )}
    </aside>
  )
}
