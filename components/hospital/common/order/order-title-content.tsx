import OrderTypeColorDot from '@/components/hospital/common/order/order-type-color-dot'
import { type IcuOrderColors } from '@/types/adimin'

type Props = {
  orderType: string
  orderName: string
  orderComment: string | null
  orderColorDisplay: string
  orderColor: IcuOrderColors
  orderFontSizeData: number
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
  orderColor,
  orderFontSizeData,
  vitalRefRange,
}: Props) {
  return (
    <div className="flex w-full items-center justify-between gap-2 truncate">
      <div className="flex items-center gap-2">
        {orderColorDisplay === 'dot' && (
          <OrderTypeColorDot
            orderColorsData={orderColor}
            orderType={orderType}
          />
        )}

        <span style={{ fontSize: `${orderFontSizeData}px` }}>{orderName}</span>

        {vitalRefRange && (
          <span className="text-xs text-muted-foreground">
            ({vitalRefRange.min}~{vitalRefRange.max})
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <span
          className="min-w-16 truncate text-right text-xs font-semibold text-muted-foreground"
          style={{ fontSize: `${orderFontSizeData - 2}px` }}
        >
          {orderComment}
        </span>
      </div>
    </div>
  )
}
