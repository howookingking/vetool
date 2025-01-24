import { type IcuOrderColors } from '@/types/adimin'

export default function OrderTypeColorDot({
  orderColorsData,
  orderType,
}: {
  orderColorsData: IcuOrderColors
  orderType: string
}) {
  return (
    <div
      className="h-4 w-4 shrink-0 rounded-full border"
      style={{
        background: orderColorsData[orderType as keyof IcuOrderColors],
      }}
    />
  )
}
