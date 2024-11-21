import Indate from './in-date'
import OutDate from './out-date'
import OutDueDate from './out-due-date'

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
