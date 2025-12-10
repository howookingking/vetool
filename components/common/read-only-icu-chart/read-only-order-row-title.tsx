import type { OrderFontSize } from '@/components/hospital/admin/icu-settings/order-font-size/order-font-size-setting'
import OrderTitleContent from '@/components/hospital/common/order/order-title-content'
import type { OrderWidth } from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-header/order-width-button'
import { TableCell } from '@/components/ui/table'
import type { OrderType } from '@/constants/hospital/icu/chart/order'
import type { IcuOrderColors, VitalRefRange } from '@/types/adimin'
import type { SelectedIcuChart, SelectedIcuOrder } from '@/types/icu/chart'

type Props = {
  order: SelectedIcuOrder
  vitalRefRange?: VitalRefRange[]
  species: SelectedIcuChart['patient']['species']
  orderWidth: OrderWidth
  orderColorsData: IcuOrderColors
  orderFontSizeData: OrderFontSize
}

export default function ReadOnlyOrderRowTitle({
  order,
  vitalRefRange,
  species,
  orderWidth,
  orderColorsData,
  orderFontSizeData,
}: Props) {
  const {
    icu_chart_order_comment,
    icu_chart_order_type,
    icu_chart_order_name,
  } = order

  // -------- 바이탈 참조범위 --------
  const foundVital = vitalRefRange?.find(
    (vital) => vital.order_name === icu_chart_order_name,
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
        transition: 'width 0.3s ease-in-out, transform 0.3s ease-in-out',
      }}
    >
      <div className="flex h-11 px-2">
        <OrderTitleContent
          orderType={icu_chart_order_type as OrderType}
          orderName={icu_chart_order_name}
          orderComment={icu_chart_order_comment}
          orderColorsData={orderColorsData}
          orderFontSizeData={orderFontSizeData}
          vitalRefRange={rowVitalRefRange}
        />
      </div>
    </TableCell>
  )
}
