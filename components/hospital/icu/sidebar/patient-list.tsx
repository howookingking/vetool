import PatientButton from '@/components/hospital/icu/sidebar/patient-button'
import { Separator } from '@/components/ui/separator'
import type { IcuSidebarIoData } from '@/types/icu/chart'

type IcuSidebarContentProps = {
  filteredIcuIoData: IcuSidebarIoData[]
  excludedIcuIoData: IcuSidebarIoData[]
  handleCloseMobileDrawer?: () => void
}

export default function PatientList({
  filteredIcuIoData,
  excludedIcuIoData,
  handleCloseMobileDrawer,
}: IcuSidebarContentProps) {
  const fileteredPatientCount = filteredIcuIoData.length

  return (
    <div className="h-[calc(100vh-210px)] flex-col gap-3 overflow-y-auto md:h-auto">
      {fileteredPatientCount > 0 ? (
        <ul className="flex flex-col gap-2">
          <span className="text-xs font-bold text-muted-foreground">
            입원환자 ({fileteredPatientCount})
          </span>
          {filteredIcuIoData.map((data) => (
            <li
              key={data.icu_io_id}
              className="w-full"
              onClick={handleCloseMobileDrawer}
            >
              <PatientButton data={data} />
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
            <span className="text-xs font-bold text-muted-foreground">
              필터링 제외 ({excludedIcuIoData.length})
            </span>
            {excludedIcuIoData.map((data) => (
              <li
                key={data.icu_io_id}
                className="w-full"
                onClick={handleCloseMobileDrawer}
              >
                <PatientButton data={data} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
