import OrderTypeColorDot from '@/components/hospital/common/order-type-color-dot'
import { parsingOrderName, renderOrderSubComment } from '@/lib/utils/utils'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'

type OrderTitleContentProps = {
  orderType: string
  orderName: string
  orderComment: string | null
  isTouchMove?: boolean
  vitalRefRange?: {
    min: number
    max: number
  }
}

export default function OrderTitleContent({
  orderType,
  orderName,
  orderComment,
  isTouchMove,
  vitalRefRange,
}: OrderTitleContentProps) {
  const {
    basicHosData: { orderColorDisplay, orderColorsData, orderFontSizeData },
  } = useBasicHosDataContext()

  return (
    <div className="flex w-full items-center justify-between gap-2 truncate">
      <div className="flex items-center gap-2">
        {orderColorDisplay === 'dot' && (
          <OrderTypeColorDot
            orderColorsData={orderColorsData}
            orderType={orderType}
          />
        )}

        <span style={{ fontSize: `${orderFontSizeData}px` }}>
          {parsingOrderName(orderType, orderName)}
        </span>

        {vitalRefRange && (
          <span className="text-xs text-muted-foreground">
            ({vitalRefRange.min}~{vitalRefRange.max})
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        {!isTouchMove && (
          <span
            className="min-w-16 truncate text-right text-xs font-semibold text-muted-foreground"
            style={{ fontSize: `${orderFontSizeData - 2}px` }}
          >
            {orderComment}
            {renderOrderSubComment(orderType)}
          </span>
        )}
      </div>
    </div>
  )
}
