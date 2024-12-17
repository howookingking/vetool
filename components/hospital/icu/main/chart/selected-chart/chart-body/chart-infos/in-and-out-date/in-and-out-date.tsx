import Indate from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/in-and-out-date/in-date'
import OutDate from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/in-and-out-date/out-date'
import OutDueDate from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/in-and-out-date/out-due-date'

export default function InAndOutDate({
  icuIoId,
  inDate,
  outDueDate,
  outDate,
}: {
  icuIoId: string
  inDate: string
  outDueDate: string | null
  outDate: string | null
}) {
  const isPatientOut = outDate !== null

  return (
    <div className="flex w-full gap-2">
      <Indate inDate={inDate} />

      {isPatientOut ? (
        <OutDate outDate={outDate} />
      ) : (
        <OutDueDate outDueDate={outDueDate} icuIoId={icuIoId} inDate={inDate} />
      )}
    </div>
  )
}
