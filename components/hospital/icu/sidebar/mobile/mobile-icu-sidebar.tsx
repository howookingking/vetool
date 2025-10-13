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
  hosId: string
}

export default function MobileSidebar({
  handleCloseMobileDrawer,
  icuSidebarPatients,
  vetList,
  targetDate,
  hosId,
}: Props) {
  // 모바일에서는 필터기능 필요없음
  const filteredData = filterPatients(
    icuSidebarPatients,
    DEFAULT_FILTER_STATE, // 따라서 기본 필터 적용
    vetList,
  )

  return (
    <aside className="flex flex-col">
      <IcuDateSelector targetDate={targetDate} />

      <Separator className="mt-2" />

      {icuSidebarPatients.length === 0 ? (
        <NoResultSquirrel
          text="입원환자가 없습니다"
          className="mt-10 flex-col"
        />
      ) : (
        <div className="h-[calc(100vh-40px)] overflow-y-auto p-2">
          <PatientList
            filters={DEFAULT_FILTER_STATE}
            filteredData={filteredData}
            handleCloseMobileDrawer={handleCloseMobileDrawer}
            vetList={vetList}
            hosId={hosId}
            targetDate={targetDate}
          />
        </div>
      )}
    </aside>
  )
}
