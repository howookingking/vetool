'use client'

import NoResultSquirrel from '@/components/common/no-result-squirrel'
import IcuDateSelector from '@/components/hospital/icu/sidebar/date-selector/icu-date-selector'
import Filters, {
  DEFAULT_FILTER_STATE,
} from '@/components/hospital/icu/sidebar/filters/filters'
import PatientList from '@/components/hospital/icu/sidebar/patient-list/patient-list'
import RegisterDialog from '@/components/hospital/icu/sidebar/register-dialog/register-dialog'
import { Separator } from '@/components/ui/separator'
import useLocalStorage from '@/hooks/use-local-storage'
import type { IcuSidebarPatient } from '@/lib/services/icu/icu-layout'
import { filterPatients } from '@/lib/utils/utils'
import type { Vet } from '@/types'

type Props = {
  hosId: string
  targetDate: string
  vetList: Vet[]
  hosGroupList: string[]
  icuSidebarPatients: IcuSidebarPatient[]
  handleCloseMobileDrawer?: () => void
}

export default function DesktopIcuSidebar({
  hosId,
  targetDate,
  vetList,
  hosGroupList,
  handleCloseMobileDrawer,
  icuSidebarPatients,
}: Props) {
  const [filters, setFilters] = useLocalStorage(
    `patientFilter`,
    DEFAULT_FILTER_STATE,
  )

  const filteredData = filterPatients(icuSidebarPatients, filters, vetList)

  return (
    <aside className="fixed z-40 hidden h-desktop w-48 shrink-0 flex-col gap-2 border-r px-2 pb-0 pt-2 2xl:flex">
      <IcuDateSelector targetDate={targetDate} />

      <RegisterDialog
        hosId={hosId}
        targetDate={targetDate}
        // # 요금제 일단 비활성화
        // 퇴원한 환자는 카운트 하면 안된다
        // chartCount={
        //   filteredData.filteredIcuIoData.length +
        //   filteredData.excludedIcuIoData.length
        // }
      />

      <Separator />

      {icuSidebarPatients.length === 0 ? (
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

          <PatientList
            filters={filters}
            filteredData={filteredData}
            vetList={vetList}
            handleCloseMobileDrawer={handleCloseMobileDrawer}
            hosId={hosId}
            targetDate={targetDate}
          />
        </>
      )}
    </aside>
  )
}
