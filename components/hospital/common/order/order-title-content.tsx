import OrderTypeColorDot from '@/components/hospital/common/order/order-type-color-dot'
import { OrderFontSize } from '@/constants/admin/order-font-size'
import type { OrderType } from '@/constants/hospital/icu/chart/order'
import type { IcuOrderColors } from '@/types/adimin'

type Props = {
  orderType: OrderType
  orderName: string
  orderComment: string | null
  orderColorDisplay: string
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
  orderColorDisplay,
  orderColorsData,
  orderFontSizeData,
  vitalRefRange,
}: Props) {
  return (
    <div className="flex w-full items-center justify-between gap-2 truncate">
      <div className="flex items-center gap-2">
        {orderColorDisplay === 'dot' ? (
          <OrderTypeColorDot
            orderColorsData={orderColorsData}
            orderType={orderType}
          />
        ) : null}

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
