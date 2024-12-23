import DefaultOrderTable from '@/components/hospital/admin/icu-settings/default-orders/default-orders-table'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getDefaultChartOrders } from '@/lib/services/admin/icu/default-orders'
import { getHosOrderColor } from '@/lib/services/admin/icu/order-color'
import type { IcuOrderColors } from '@/types/adimin'

export default async function DefaultOrdersTab({ hosId }: { hosId: string }) {
  const defaultChartOrders = await getDefaultChartOrders(hosId)
  const orderColor = await getHosOrderColor(hosId)

  return (
    <Card className="mt-2 sm:w-1/2">
      <CardHeader>
        <CardTitle>기본 차트</CardTitle>
        <CardDescription>기본형식의 차트를 설정해주세요</CardDescription>
      </CardHeader>

      <CardContent>
        <DefaultOrderTable
          defaultChartOrders={defaultChartOrders}
          orderColorsData={orderColor as IcuOrderColors}
        />
      </CardContent>
    </Card>
  )
}
