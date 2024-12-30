import PatientButton from '@/components/hospital/icu/sidebar/patient-button'
import { Separator } from '@/components/ui/separator'
import type { IcuSidebarIoData, Vet } from '@/types/icu/chart'

type IcuSidebarContentProps = {
  filteredIcuIoData: IcuSidebarIoData[]
  excludedIcuIoData: IcuSidebarIoData[]
  vetsListData: Vet[]
  handleCloseMobileDrawer?: () => void
}

export default function PatientList({
  filteredIcuIoData,
  excludedIcuIoData,
  vetsListData,
  handleCloseMobileDrawer,
}: IcuSidebarContentProps) {
  const fileteredPatientCount = filteredIcuIoData.length

  return (
    <div className="h-[calc(100vh-270px)] flex-col gap-3 overflow-y-auto">
      {fileteredPatientCount > 0 ? (
        <ul className="flex flex-col gap-2">
          <li className="text-xs font-bold text-muted-foreground">
            입원환자 ({fileteredPatientCount})
          </li>
          {filteredIcuIoData.map((icuIoData) => (
            <li
              key={icuIoData.icu_io_id}
              className="w-full last:mb-4"
              onClick={handleCloseMobileDrawer}
            >
              <PatientButton
                icuIoData={icuIoData}
                vetsListData={vetsListData}
              />
            </li>
          ))}
        </ul>
      ) : (
        <span className="py-2 text-xs font-bold text-muted-foreground">
          필터링된 입원환자 없음
        </span>
      )}

      {excludedIcuIoData.length > 0 && (
        <>
          <Separator className="my-3" />

          <ul className="flex flex-col gap-2">
            <li className="text-xs font-bold text-muted-foreground">
              필터링 제외 ({excludedIcuIoData.length})
            </li>
            {excludedIcuIoData.map((icuIoData) => (
              <li
                key={icuIoData.icu_io_id}
                className="w-full"
                onClick={handleCloseMobileDrawer}
              >
                <PatientButton
                  icuIoData={icuIoData}
                  vetsListData={vetsListData}
                />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
