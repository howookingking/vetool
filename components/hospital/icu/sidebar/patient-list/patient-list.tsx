import PatientButton from '@/components/hospital/icu/sidebar/patient-list/patient-button'
import { Separator } from '@/components/ui/separator'
import type { FilteredData } from '@/lib/utils/utils'
import type { Vet } from '@/types'

type Props = {
  filteredData: FilteredData
  handleCloseMobileDrawer?: () => void
  vetList: Vet[]
}

export default function PatientList({
  filteredData,
  handleCloseMobileDrawer,
  vetList,
}: Props) {
  const { filteredIcuIoData, excludedIcuIoData, outIcuIoData } = filteredData

  const filteredCount = filteredIcuIoData.length
  const excludedCount = excludedIcuIoData.length
  const outCount = outIcuIoData.length

  return (
    <div className="flex-col gap-3 overflow-y-auto">
      {filteredCount > 0 ? (
        <ul className="flex flex-col gap-2">
          <li className="flex items-center justify-between text-xs font-bold text-muted-foreground">
            <span className="font-bold">입원환자 ({filteredCount})</span>
          </li>

          {filteredIcuIoData.map((icuIoData) => (
            <li
              key={icuIoData.icu_io_id}
              className="w-full last:mb-2"
              onClick={handleCloseMobileDrawer}
            >
              <PatientButton icuIoData={icuIoData} vetList={vetList} />
            </li>
          ))}
        </ul>
      ) : (
        <span className="py-2 text-xs font-bold text-muted-foreground">
          필터링된 입원환자 없음
        </span>
      )}

      {excludedCount > 0 && (
        <>
          <Separator className="mb-3" />

          <ul className="flex flex-col gap-2">
            <li className="text-xs font-bold text-muted-foreground">
              필터링 제외 ({excludedCount})
            </li>
            {excludedIcuIoData.map((icuIoData) => (
              <li
                key={icuIoData.icu_io_id}
                className="w-full last:mb-2"
                onClick={handleCloseMobileDrawer}
              >
                <PatientButton icuIoData={icuIoData} vetList={vetList} />
              </li>
            ))}
          </ul>
        </>
      )}

      {outCount > 0 && (
        <>
          <Separator className="mb-3" />

          <ul className="flex flex-col gap-2">
            <li className="text-xs font-bold text-muted-foreground">
              퇴원환자 ({outCount})
            </li>
            {outIcuIoData.map((icuIoData) => (
              <li
                key={icuIoData.icu_io_id}
                className="w-full last:mb-2"
                onClick={handleCloseMobileDrawer}
              >
                <PatientButton icuIoData={icuIoData} vetList={vetList} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
