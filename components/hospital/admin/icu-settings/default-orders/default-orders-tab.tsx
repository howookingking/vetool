import DefaultOrderTable from '@/components/hospital/admin/icu-settings/default-orders/default-orders-table'
import { getDefaultChartOrders } from '@/lib/services/admin/icu/default-orders'
import { getHosOrderColor } from '@/lib/services/admin/icu/order-color'
import type { IcuOrderColors } from '@/types/adimin'

export default async function DefaultOrdersTab({ hosId }: { hosId: string }) {
  const defaultChartOrders = await getDefaultChartOrders(hosId)
  const orderColor = await getHosOrderColor(hosId)

  return (
    <DefaultOrderTable
      defaultChartOrders={defaultChartOrders}
      orderColorsData={orderColor as IcuOrderColors}
    />
  )
}
