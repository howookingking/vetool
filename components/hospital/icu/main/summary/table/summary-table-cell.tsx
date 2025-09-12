import { TableCell } from '@/components/ui/table'
import { CELL_COLORS } from '@/constants/hospital/icu/chart/colors'

type Props = {
  time: number
  isPatientOut: boolean
  hasCrucialTx: boolean
  pendingCount: number
}

export default function SummaryTableCell({
  isPatientOut,
  hasCrucialTx,
  pendingCount,
}: Props) {
  return (
    <TableCell
      className="relative text-center"
      style={{
        backgroundColor:
          pendingCount > 0
            ? isPatientOut
              ? CELL_COLORS.OUT
              : CELL_COLORS.NOT_DONE
            : CELL_COLORS.DONE,
      }}
    >
      {pendingCount}

      {hasCrucialTx && (
        <span className="absolute bottom-0 left-0 text-[10px]">❗️</span>
      )}
    </TableCell>
  )
}
