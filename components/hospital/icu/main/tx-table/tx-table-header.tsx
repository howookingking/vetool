import TimeTxTextCopy from '@/components/hospital/icu/main/tx-table/time-tx-text-copy'
import { TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { toast } from '@/components/ui/use-toast'
import { DEFAULT_ICU_ORDER_TYPE } from '@/constants/hospital/icu/chart/order'
import { TIMES } from '@/constants/hospital/icu/chart/time'
import { IcuTxTableData } from '@/types/icu/tx-table'
import { useState } from 'react'

export default function TxTableHeader({
  localFilterState,
  filteredTxData,
}: {
  localFilterState: string[]
  filteredTxData: IcuTxTableData[]
}) {
  const [copiedTxTime, setCopiedTxTime] = useState<number | null>()

  const handleTimeTxTextCopy = (time: number) => {
    const title = `${time}시 ${localFilterState.map((order) => DEFAULT_ICU_ORDER_TYPE.find((type) => type.value === order)?.label ?? '전체').join(', ')} 처치`

    const filteredTimeTxData = filteredTxData
      .map((data) => ({
        ...data,
        orders: data.orders.filter(
          (order) =>
            order.icu_chart_order_time[time - 1] !== '0' &&
            !order.treatments.find((tx) => tx.time === time),
        ),
      }))
      .filter((data) => data.orders.length > 0)

    if (filteredTimeTxData.length === 0) {
      toast({
        title: `${title}가 없습니다`,
        variant: 'destructive',
      })
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
    toast({
      title: `${title}를 클립보드에 저장하였습니다`,
    })
  }

  return (
    <TableHeader className="sticky top-0 z-30 bg-white shadow-sm">
      <TableRow>
        <TableHead className="w-[120px] text-center">환자목록</TableHead>

        {TIMES.map((time) => (
          <TableHead className="border text-center" key={time}>
            <div className="flex items-center justify-center">
              <span>{time.toString().padStart(2, '0')}</span>
              <TimeTxTextCopy
                handleClick={() => handleTimeTxTextCopy(time)}
                isCopied={copiedTxTime === time}
              />
            </div>
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  )
}
