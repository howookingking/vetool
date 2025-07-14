import OrderTypeColorDot from '@/components/hospital/common/order/order-type-color-dot'
import { Button } from '@/components/ui/button'
import { TableCell } from '@/components/ui/table'
import type { IcuOrderColors } from '@/types/adimin'
import type { IcuTxTableData } from '@/types/icu/tx-table'
import { ArrowRight, Edit } from 'lucide-react'

type Props = {
  time: number
  order: IcuTxTableData['orders'][number]
  treatment?: IcuTxTableData['orders'][number]['treatments'][number]
  patientId: string
  patientName: string
  orderColorsData: IcuOrderColors
  handleClickMove: (
    patientId: string,
    time: number,
    order: IcuTxTableData['orders'][number],
  ) => void
  handleOpenTxDetail: (
    order: IcuTxTableData['orders'][number],
    time: number,
    treatment?: IcuTxTableData['orders'][number]['treatments'][number],
  ) => void
}

export default function TxTableCell({
  time,
  order,
  treatment,
  patientId,
  orderColorsData,
  handleClickMove,
  handleOpenTxDetail,
}: Props) {
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
              onClick={() => handleClickMove(patientId, time, order)}
            >
              <ArrowRight />
            </Button>
          </div>
        </div>
      </>
    </TableCell>
  )
}
