import { getDefaultChartOrders } from '@/lib/services/admin/icu/default-orders'
import { getHosOrderColor } from '@/lib/services/admin/icu/order-color'
import type { IcuOrderColors } from '@/types/adimin'
import DefaultOrdersSetting from './default-orders-setting'

export default async function DefaultOrdersTab({ hosId }: { hosId: string }) {
  const defaultChartOrders = await getDefaultChartOrders(hosId)
  const orderColor = await getHosOrderColor(hosId)

  return (
    <DefaultOrdersSetting
      defaultChartOrders={defaultChartOrders}
      orderColorsData={orderColor as IcuOrderColors}
    />
  )
}
