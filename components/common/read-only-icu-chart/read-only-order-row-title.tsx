import OrderTitleContent from '@/components/hospital/common/order/order-title-content'
import { TableCell } from '@/components/ui/table'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import type { IcuOrderColors, VitalRefRange } from '@/types/adimin'
import type { SelectedIcuOrder } from '@/types/icu/chart'

type Props = {
  order: SelectedIcuOrder
  vitalRefRange?: VitalRefRange[]
  species: string
  orderWidth: number
}

export default function ReadOnlyOrderRowTitle({
  order,
  vitalRefRange,
  species,
  orderWidth,
}: Props) {
  const { order_comment, order_type, order_name } = order

  const {
    basicHosData: { orderColorsData, orderColorDisplay, orderFontSizeData },
  } = useBasicHosDataContext()

  // -------- 바이탈 참조범위 --------
  const foundVital = vitalRefRange?.find(
    (vital) => vital.order_name === order.order_name,
  )
  const rowVitalRefRange = foundVital
    ? foundVital[species as keyof Omit<VitalRefRange, 'order_name'>]
    : undefined
  // -------- 바이탈 참조범위 --------

  return (
    <TableCell
      className="p-0"
      style={{
        width: orderWidth,
        background:
          orderColorDisplay === 'full'
            ? orderColorsData[order_type as keyof IcuOrderColors]
            : 'transparent',
      }}
    >
      <div
        className="flex h-11 px-2"
        style={{
          width: orderWidth,
        }}
      >
        <OrderTitleContent
          orderType={order_type}
          orderName={order_name}
          orderComment={order_comment}
          orderColorDisplay={orderColorDisplay}
          orderColorsData={orderColorsData}
          orderFontSizeData={orderFontSizeData}
          vitalRefRange={rowVitalRefRange}
        />
      </div>
    </TableCell>
  )
}
