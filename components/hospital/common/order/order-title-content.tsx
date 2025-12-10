import type { OrderFontSize } from '@/components/hospital/admin/icu-settings/order-font-size/order-font-size-setting'
import OrderTypeColorDot from '@/components/hospital/common/order/order-type-color-dot'
import type { IcuOrderColors } from '@/types/adimin'
import type { SelectedIcuOrder } from '@/types/icu/chart'

type Props = {
  orderType: SelectedIcuOrder['icu_chart_order_type']
  orderName: SelectedIcuOrder['icu_chart_order_name']
  orderComment: SelectedIcuOrder['icu_chart_order_comment']
  orderColorsData: IcuOrderColors
  orderFontSizeData: OrderFontSize
  vitalRefRange?: {
    min: number
    max: number
  }
}

export default function OrderTitleContent({
  orderType,
  orderName,
  orderComment,
  orderColorsData,
  orderFontSizeData,
  vitalRefRange,
}: Props) {
  return (
    <div className="flex w-full items-center justify-between gap-2 truncate">
      <div className="flex items-center gap-2">
        <OrderTypeColorDot
          orderColorsData={orderColorsData}
          orderType={orderType}
        />

        <span
          style={{ fontSize: `${orderFontSizeData}px` }}
          className="leading-tight"
        >
          {orderName}
        </span>

        {vitalRefRange ? (
          <span className="text-xs text-muted-foreground">
            ({vitalRefRange.min}~{vitalRefRange.max})
          </span>
        ) : null}
      </div>

      <span
        className="min-w-16 truncate text-right text-xs font-semibold text-muted-foreground"
        style={{ fontSize: `${orderFontSizeData - 2}px` }}
      >
        {orderComment}
      </span>
    </div>
  )
}
