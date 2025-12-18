import { TxDetailHover } from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/tx/tx-detail-hover'
import { VitalResultIndication } from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/tx/vital-result-indication'
import { Input } from '@/components/ui/input'
import { TableCell } from '@/components/ui/table'
import useAbnormalVital from '@/hooks/use-abnormal-vital'
import { cn } from '@/lib/utils/utils'
import type { SelectedTreatment } from '@/types/icu/chart'
import { ImageIcon } from 'lucide-react'

type Props = {
  time: number
  treatment?: SelectedTreatment
  icuChartOrderId: string
  isDone: boolean
  orderer: string
  orderName: string
  showOrderer: boolean
  isGuidelineTime: boolean
  rowVitalRefRange:
    | {
        min: number
        max: number
      }
    | undefined
  hasOrder: boolean
  hasComment: boolean
}

export default function ReadOnlyCell({
  time,
  treatment,
  icuChartOrderId,
  isDone,
  orderer,
  orderName,
  showOrderer,
  isGuidelineTime,
  rowVitalRefRange,
  hasComment,
  hasOrder,
}: Props) {
  const { calcVitalResult, isAbnormalVital } = useAbnormalVital(
    orderName,
    treatment,
    rowVitalRefRange,
  )

  // 배경색을 인라인 스타일로 적용 (PNG export를 위해)
  const getBackgroundColor = () => {
    if (isDone) return 'rgba(52, 211, 153, 0.1)' // emerald-400/10
    if (hasOrder) return 'rgba(251, 113, 133, 0.1)' // rose-400/10
    if (isGuidelineTime) return 'rgba(252, 211, 77, 0.1)' // amber-300/10
    return 'transparent'
  }

  return (
    <TableCell
      className="handle group p-0"
      style={{ backgroundColor: getBackgroundColor() }}
    >
      <div
        className={cn(
          'relative [&:focus-within_.tx-result-overlay]:overflow-visible',
        )}
      >
        <Input
          id={`${icuChartOrderId}&${time}`}
          className={cn(
            'h-11 min-w-12 rounded-none border-none bg-transparent px-1 text-center ring-inset focus-visible:ring-2 md:min-w-0',
          )}
          readOnly
        />

        <span
          className={cn(
            'absolute inset-0 -z-10 flex items-center justify-center overflow-hidden whitespace-pre group-hover:overflow-visible',
          )}
        >
          {treatment?.icu_chart_tx_result ?? ''}
        </span>

        {hasOrder && showOrderer && (
          <div
            className={cn(
              'pointer-events-none absolute bottom-0.5 right-0.5 text-[10px] leading-none text-muted-foreground',
            )}
          >
            {orderer}
          </div>
        )}

        {hasComment && (
          <TxDetailHover txComment={treatment?.icu_chart_tx_comment!} />
        )}

        {isAbnormalVital && (
          <VitalResultIndication
            result={calcVitalResult as 'below' | 'above'}
          />
        )}

        {treatment?.is_crucial && (
          <span className="pointer-events-none absolute bottom-0 left-0 text-[10px]">
            ❗️
          </span>
        )}

        {treatment?.has_images && (
          <ImageIcon
            size={14}
            strokeWidth={2}
            className="pointer-events-none absolute right-0.5 top-0.5 text-pink-500"
          />
        )}
      </div>
    </TableCell>
  )
}
