import type { IcuOrderColors } from '@/types/adimin'
import type { SelectedIcuOrder } from '@/types/icu/chart'

type Props = {
  orderColorsData: IcuOrderColors
  orderType: SelectedIcuOrder['icu_chart_order_type']
}

export default function OrderTypeColorDot({
  orderColorsData,
  orderType,
}: Props) {
  return (
    <div
      className="h-4 w-4 shrink-0 rounded-full border"
      style={{
        background: orderColorsData[orderType as keyof IcuOrderColors],
      }}
    />
  )
}
