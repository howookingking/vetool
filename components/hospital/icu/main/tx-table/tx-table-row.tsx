import PatientBriefInfo from '@/components/hospital/common/patient/patient-brief-info'
import { TableCell, TableRow } from '@/components/ui/table'
import { TIMES } from '@/constants/hospital/icu/chart/time'
import { cn } from '@/lib/utils/utils'
import type { IcuOrderColors } from '@/types/adimin'
import type { Species } from '@/types/hospital/calculator'
import type { Treatment } from '@/types/icu/chart'
import type { IcuTxTableData } from '@/types/icu/tx-table'
import { SquarePlusIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { memo, useMemo } from 'react'
import TxTableCell from './tx-table-cell'

type Props = {
  txData: IcuTxTableData
  order: IcuTxTableData['orders'][number]
  hosId: string
  targetDate: string
  bgColor: string
  orderColorsData: Record<string, string>
  handleOpenTxDetail: (
    order: IcuTxTableData['orders'][number],
    time: number,
    treatment?: Treatment,
  ) => void
  j: number
  isLastOrder: boolean
  orderLength: number
}

const TxTableRow = memo(function TxTableRow({
  txData,
  order,
  hosId,
  targetDate,
  bgColor,
  orderColorsData,
  handleOpenTxDetail,
  j,
  isLastOrder,
  orderLength,
}: Props) {
  const { push } = useRouter()

  const timeMap = useMemo(() => {
    const map = new Map<number, Treatment>()
    for (const tx of order.treatments) {
      map.set(tx.time, tx)
    }
    return map
  }, [order.treatments])

  const handleMoveToChart = () =>
    push(`/hospital/${hosId}/icu/${targetDate}/chart/${txData.patient_id}`)

  return (
    <TableRow
      style={{ background: bgColor }}
      className={cn(
        isLastOrder && 'border-b-[1.5px] border-muted-foreground',
        'divide-x',
      )}
    >
      <TableCell
        className={cn(
          'sticky left-0 z-20 cursor-pointer bg-white text-center shadow-2xl transition hover:bg-muted',
          j !== 0 && 'hidden',
        )}
        rowSpan={orderLength}
        onClick={handleMoveToChart}
      >
        <PatientBriefInfo
          name={txData.patient.name}
          breed={txData.patient.breed}
          species={txData.patient.species as Species}
        />

        {/* 몸무게 */}
        <div className="flex flex-col justify-center gap-1">
          <span className="text-xs">
            {txData.icu_charts.weight
              ? `${txData.icu_charts.weight}kg`
              : '체중 미입력'}
          </span>

          {/* 케이지 */}
          {txData.icu_io.cage && (
            <div className="flex items-center justify-center gap-1 text-muted-foreground">
              <SquarePlusIcon size={12} />
              <span className="text-xs">{txData.icu_io.cage}</span>
            </div>
          )}
        </div>
      </TableCell>

      {TIMES.map((time) => {
        // 오더가 없으면 빈셀
        const isScheduled = order.icu_chart_order_time[time] !== '0'
        if (!isScheduled) return <TableCell key={time} />

        // 처치결과가 있으면 빈셀
        const treatment = timeMap.get(time)
        if (treatment?.tx_result) return <TableCell key={time} />

        return (
          <TxTableCell
            key={time}
            hosId={hosId}
            targetDate={targetDate}
            time={time}
            order={order}
            treatment={treatment}
            patientId={txData.patient_id}
            orderColorsData={orderColorsData as IcuOrderColors}
            handleOpenTxDetail={handleOpenTxDetail}
          />
        )
      })}
    </TableRow>
  )
})

export default TxTableRow
