import PatientButton from '@/components/hospital/icu/sidebar/patient-list/patient-button'
import { Separator } from '@/components/ui/separator'
import { cn, type FilteredData } from '@/lib/utils/utils'
import type { Vet } from '@/types'
import type { FilterState } from '../filters/filters'

type Props = {
  filters: FilterState
  filteredData: FilteredData
  handleCloseMobileDrawer?: () => void
  vetList: Vet[]
  hosId: string
  targetDate: string
}

export default function PatientList({
  filters,
  filteredData,
  handleCloseMobileDrawer,
  vetList,
  hosId,
  targetDate,
}: Props) {
  const isFilterSelected = filters.selectedGroup || filters.selectedVet
  const { filteredIcuIoData, excludedIcuIoData, outIcuIoData } = filteredData

  const filteredCount = filteredIcuIoData.length
  const excludedCount = excludedIcuIoData.length
  const outCount = outIcuIoData.length

  return (
    <div className="flex-col gap-3 overflow-y-auto">
      {/* 입원 중인 환자가 0명인 경우 */}
      {filteredCount + excludedCount === 0 ? (
        <div className="mb-2 text-xs font-bold">입원환자 (0)</div>
      ) : (
        <ul className="flex flex-col gap-2">
          <li className="flex items-center justify-between text-xs font-bold">
            <span className={cn('font-bold', filteredCount === 0 && 'mb-2')}>
              {isFilterSelected ? '필터링된 ' : ''}
              입원환자 ({filteredCount})
            </span>
          </li>

          {filteredIcuIoData.map((icuIoData) => (
            <li
              key={icuIoData.icu_io_id}
              className="w-full last:mb-2"
              onClick={handleCloseMobileDrawer}
            >
              <PatientButton
                icuIoData={icuIoData}
                vetList={vetList}
                hosId={hosId}
                targetDate={targetDate}
              />
            </li>
          ))}
        </ul>
      )}

      {excludedCount > 0 && (
        <>
          <Separator className="mb-2" />

          <ul className="flex flex-col gap-2">
            <li className="text-xs font-bold">필터링 제외 ({excludedCount})</li>
            {excludedIcuIoData.map((icuIoData) => (
              <li
                key={icuIoData.icu_io_id}
                className="w-full last:mb-2"
                onClick={handleCloseMobileDrawer}
              >
                <PatientButton
                  icuIoData={icuIoData}
                  vetList={vetList}
                  hosId={hosId}
                  targetDate={targetDate}
                />
              </li>
            ))}
          </ul>
        </>
      )}

      {outCount > 0 && (
        <>
          <Separator className="mb-2" />

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
                <PatientButton
                  icuIoData={icuIoData}
                  vetList={vetList}
                  hosId={hosId}
                  targetDate={targetDate}
                />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
