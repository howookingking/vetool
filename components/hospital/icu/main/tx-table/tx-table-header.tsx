import TimeTxTextCopy from '@/components/hospital/icu/main/tx-table/time-tx-text-copy'
import { TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  DEFAULT_ICU_ORDER_TYPE,
  type OrderType,
} from '@/constants/hospital/icu/chart/order'
import { TIMES } from '@/constants/hospital/icu/chart/time'
import { useCurrentTime } from '@/hooks/use-current-time'
import { formatDate } from '@/lib/utils/utils'
import type { IcuTxTableData } from '@/types/icu/tx-table'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { CurrentTimeIndicator } from '../chart/selected-chart/chart-body/table/chart-table-header/current-time-indicator'

type Props = {
  orderTypeFilter: OrderType | null
  filteredTxData: IcuTxTableData[]
}

export default function TxTableHeader({
  orderTypeFilter,
  filteredTxData,
}: Props) {
  const { hours, minutes } = useCurrentTime()
  const { target_date } = useParams()
  const isToday = formatDate(new Date()) === target_date

  const [copiedTxTime, setCopiedTxTime] = useState<number | null>()

  const handleCopyToClipboard = (time: number) => {
    const title = `${time}시 ${DEFAULT_ICU_ORDER_TYPE.find((type) => type.value === orderTypeFilter)?.label ?? '전체'}오더`

    const filteredTimeTxData = filteredTxData
      .map((data) => ({
        ...data,
        orders: data.orders.filter(
          (order) =>
            order.icu_chart_order_time[time] !== '0' &&
            !order.treatments.find((tx) => tx.time === time),
        ),
      }))
      .filter((data) => data.orders.length > 0)

    if (filteredTimeTxData.length === 0) {
      toast.warning(`${title}가 없습니다`)
      return
    }

    let text = `‼️${title}\n\n`

    filteredTimeTxData.forEach((data) => {
      const speciesEmoji = data.patient.species === 'canine' ? '🐶' : '🐱'

      text += `${speciesEmoji} ${data.patient.name}(${data.patient.breed}) - ${data.icu_charts.weight}kg\n`

      data.orders.forEach(
        (order) =>
          (text += `✅ ${order.icu_chart_order_name}, ${order.icu_chart_order_comment ?? ''} \n`),
      )
      text += '\n'
    })

    navigator.clipboard.writeText(text.trim())
    setCopiedTxTime(time)

    toast.success(`${title}를 클립보드에 저장하였습니다`)
  }

  return (
    <TableHeader className="sticky top-0 z-30 bg-white shadow-sm">
      <TableRow>
        <TableHead className="w-[120px] text-center">환자 \ 시간</TableHead>

        {TIMES.map((time) => {
          const shouldShowIndicator = time === hours && isToday
          return (
            <TableHead
              className="relative border-l border-t-0 text-center"
              key={time}
            >
              <div className="flex items-center justify-center">
                <span>{time.toString().padStart(2, '0')}</span>
                <TimeTxTextCopy
                  handleClick={() => handleCopyToClipboard(time)}
                  isCopied={copiedTxTime === time}
                />
              </div>
              {shouldShowIndicator && (
                <CurrentTimeIndicator minutes={minutes} />
              )}
            </TableHead>
          )
        })}
      </TableRow>
    </TableHeader>
  )
}
