import Indate from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/in-and-out-date/in-date'
import OutDate from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/in-and-out-date/out-date'
import OutDueDate from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/in-and-out-date/out-due-date'

export default function InAndOutDate({
  icuIoId,
  inDate,
  outDueDate,
  outDate,
  noIcon,
}: {
  icuIoId: string
  inDate: string
  outDueDate: string | null
  outDate: string | null
  noIcon?: boolean
}) {
  const isPatientOut = outDate !== null

  return (
    <div className="grid w-full grid-cols-2 gap-2">
      <div className="col-span-1">
        <Indate inDate={inDate} noIcon={noIcon} />
      </div>

      <div className="col-span-1">
        {isPatientOut ? (
          <OutDate outDate={outDate} noIcon={noIcon} />
        ) : (
          <OutDueDate
            outDueDate={outDueDate}
            icuIoId={icuIoId}
            inDate={inDate}
            noIcon={noIcon}
          />
        )}
      </div>
    </div>
  )
}
