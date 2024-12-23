import { getHosOrderColorSettings } from '@/lib/services/admin/icu/order-color'
import type { IcuOrderColors } from '@/types/adimin'
import OrderColorSettings from './order-color-settings'

export default async function OrderColorTab({ hosId }: { hosId: string }) {
  const orderColorSettings = await getHosOrderColorSettings(hosId)

  return (
    <OrderColorSettings
      orderColorSettings={
        orderColorSettings as {
          order_color: IcuOrderColors
          order_color_display: string
        }
      }
    />
  )
}
