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
  const excludedPatientCount = excludedIcuIoData.length

  return (
    <div className="flex-col gap-3 overflow-y-auto">
      {fileteredPatientCount > 0 ? (
        <ul className="flex flex-col gap-2 overflow-y-scroll">
          <li className="flex items-center justify-between text-xs font-bold text-muted-foreground">
            <span className="font-bold">
              입원환자 ({fileteredPatientCount})
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

      {excludedPatientCount > 0 && (
        <>
          <Separator className="my-3" />

          <ul className="flex flex-col gap-2 overflow-y-scroll">
            <li className="text-xs font-bold text-muted-foreground">
              필터링 제외 ({excludedPatientCount})
            </li>
            {excludedIcuIoData.map((icuIoData) => (
              <li
                key={icuIoData.icu_io_id}
                className="w-full last:mb-2"
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
