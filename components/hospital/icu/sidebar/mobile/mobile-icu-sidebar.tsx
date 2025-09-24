import NoResultSquirrel from '@/components/common/no-result-squirrel'
import IcuDateSelector from '@/components/hospital/icu/sidebar/date-selector/icu-date-selector'
import PatientList from '@/components/hospital/icu/sidebar/patient-list/patient-list'
import { Separator } from '@/components/ui/separator'
import type { IcuSidebarPatient } from '@/lib/services/icu/icu-layout'
import { filterPatients } from '@/lib/utils/utils'
import type { Vet } from '@/types'
import { DEFAULT_FILTER_STATE } from '../filters/filters'

type Props = {
  handleCloseMobileDrawer?: () => void
  icuSidebarPatients: IcuSidebarPatient[]
  vetList: Vet[]
  targetDate: string
}

export default function MobileSidebar({
  handleCloseMobileDrawer,
  icuSidebarPatients,
  vetList,
  targetDate,
}: Props) {
  // 모바일에서는 필터기능 필요없음
  const filteredData = filterPatients(
    icuSidebarPatients,
    DEFAULT_FILTER_STATE, // 따라서 기본 필터 적용
    vetList,
  )

  return (
    <aside className="flex h-full flex-col">
      <IcuDateSelector targetDate={targetDate} />

      <Separator className="mb-1 mt-4" />

      {icuSidebarPatients.length === 0 ? (
        <NoResultSquirrel
          text="입원환자가 없습니다"
          className="mt-10 flex-col"
        />
      ) : (
        <div className="flex h-full flex-col gap-4 p-2">
          <PatientList
            filteredData={filteredData}
            handleCloseMobileDrawer={handleCloseMobileDrawer}
            vetList={vetList}
          />
        </div>
      )}
    </aside>
  )
}
