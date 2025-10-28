import OrderTypeColorDot from '@/components/hospital/common/order/order-type-color-dot'
import { Button } from '@/components/ui/button'
import { TableCell } from '@/components/ui/table'
import type { IcuOrderColors } from '@/types/adimin'
import type { IcuTxTableData } from '@/types/icu/tx-table'
import { ArrowRight, Edit } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Props = {
  hosId: string
  targetDate: string
  time: number
  order: IcuTxTableData['orders'][number]
  treatment?: IcuTxTableData['orders'][number]['treatments'][number]
  patientId: string
  orderColorsData: IcuOrderColors
  handleOpenTxDetail: (
    order: IcuTxTableData['orders'][number],
    time: number,
    treatment?: IcuTxTableData['orders'][number]['treatments'][number],
  ) => void
}

export default function TxTableCell({
  hosId,
  targetDate,
  time,
  order,
  treatment,
  patientId,
  orderColorsData,
  handleOpenTxDetail,
}: Props) {
  const { push } = useRouter()

  const handleMoveToChart = () =>
    push(
      `/hospital/${hosId}/icu/${targetDate}/chart/${patientId}?order-id=${order.icu_chart_order_id}&time=${time}`,
    )

  return (
    <TableCell className="relative px-3 py-2 text-center ring-inset ring-primary transition-all">
      <>
        <div className="flex flex-col gap-0.5">
          <div className="flex flex-col whitespace-nowrap">
            <div className="flex items-center justify-center gap-2">
              <OrderTypeColorDot
                orderColorsData={orderColorsData}
                orderType={order.icu_chart_order_type}
              />
              <span>{order.icu_chart_order_name}</span>
            </div>
            <span className="text-xs text-muted-foreground">
              {order.icu_chart_order_comment}
            </span>
          </div>

          <div className="flex justify-center">
            {treatment?.is_crucial && <div>❗️</div>}
            <div>{treatment?.tx_comment}</div>
          </div>

          <div className="flex justify-center gap-1.5">
            <Button
              variant="outline"
              className="h-6 w-6 p-4"
              size="icon"
              title="처치입력"
              onClick={() => handleOpenTxDetail(order, time, treatment)}
            >
              <Edit />
            </Button>
            <Button
              variant="outline"
              className="h-6 w-6 p-4"
              size="icon"
              title="이동"
              onClick={handleMoveToChart}
            >
              <ArrowRight />
            </Button>
          </div>
        </div>
      </>
    </TableCell>
  )
}
