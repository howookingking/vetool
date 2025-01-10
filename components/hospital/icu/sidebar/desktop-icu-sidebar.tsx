import NoResultSquirrel from '@/components/common/no-result-squirrel'
import IcuDateSelector from '@/components/hospital/icu/sidebar/date-selector/icu-date-selector'
import Filters from '@/components/hospital/icu/sidebar/filters/filters'
import PatientList from '@/components/hospital/icu/sidebar/patient-list'
import RegisterDialog from '@/components/hospital/icu/sidebar/register-dialog/register-dialog'
import { Separator } from '@/components/ui/separator'
import type { IcuSidebarIoData, Vet } from '@/types/icu/chart'

type DesktopIcuSidebarProps = {
  hosId: string
  vetsListData: Vet[]
  hosGroupList: string[]
  filteredData: {
    filteredIcuIoData: IcuSidebarIoData[]
    excludedIcuIoData: IcuSidebarIoData[]
  }
  isEmpty: boolean
  handleCloseMobileDrawer?: () => void
}

export default function DesktopIcuSidebar({
  hosId,
  vetsListData,
  hosGroupList,
  filteredData,
  isEmpty,
  handleCloseMobileDrawer,
}: DesktopIcuSidebarProps) {
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
          <Filters hosGroupList={hosGroupList} vetsListData={vetsListData} />

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
