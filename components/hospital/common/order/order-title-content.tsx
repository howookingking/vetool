import HelperTooltip from '@/components/common/helper-tooltip'
import type { OrderFontSize } from '@/components/hospital/admin/icu-settings/order-font-size/order-font-size-setting'
import OrderTypeColorDot from '@/components/hospital/common/order/order-type-color-dot'
import type { IcuOrderColors } from '@/types/adimin'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { format } from 'date-fns'

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
  treatmentLength?: number
  targetDate?: string
}

export default function OrderTitleContent({
  orderType,
  orderName,
  orderComment,
  orderColorsData,
  orderFontSizeData,
  vitalRefRange,
  treatmentLength,
  targetDate,
}: Props) {
  const noFecalOrUrineResult =
    (orderName === '배변' || orderName === '배뇨') && treatmentLength === 0
  const formattedTargetDate =
    noFecalOrUrineResult && targetDate ? format(targetDate, 'MM월dd일') : null

  return (
    <div className="flex w-full items-center justify-between gap-2 truncate">
      <div className="flex items-center gap-2">
        <OrderTypeColorDot
          orderColorsData={orderColorsData}
          orderType={orderType}
        />

        <div className="flex items-center gap-1">
          <span
            style={{ fontSize: orderFontSizeData }}
            className="leading-tight"
          >
            {orderName}
          </span>

          {noFecalOrUrineResult && (
            <HelperTooltip variant="warning">
              {formattedTargetDate
                ? orderName === '배변'
                  ? `${formattedTargetDate} 배변이 없습니다`
                  : `${formattedTargetDate} 배뇨가 없습니다`
                : null}
            </HelperTooltip>
          )}
        </div>

        {vitalRefRange && (
          <span className="text-xs text-muted-foreground">
            ({vitalRefRange.min}~{vitalRefRange.max})
          </span>
        )}
      </div>

      <span
        className="min-w-16 truncate text-right text-xs font-semibold text-muted-foreground"
        style={{ fontSize: orderFontSizeData - 2 }}
      >
        {orderComment}
      </span>
    </div>
  )
}
