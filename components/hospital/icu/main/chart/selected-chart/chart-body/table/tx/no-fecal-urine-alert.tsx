import { TableCell } from '@/components/ui/table'
import type { SelectedIcuOrder } from '@/types/icu/chart'

export default function NoFecalOrUrineAlert({
  orderName,
}: {
  orderName: SelectedIcuOrder['icu_chart_order_name']
}) {
  return (
    <TableCell className="absolute inset-0 -z-10 flex items-center justify-center">
      <span className="ml-[320px] font-bold tracking-[16px] text-red-500">
        {orderName} 없음
      </span>
    </TableCell>
  )
}
