import type { IcuOrderColors } from '@/types/adimin'

type Props = {
  orderColorsData: IcuOrderColors
  orderType: string
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
