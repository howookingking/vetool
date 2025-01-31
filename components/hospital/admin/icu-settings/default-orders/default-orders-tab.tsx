import DefaultOrderTable from '@/components/hospital/admin/icu-settings/default-orders/default-orders-table'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getDefaultChartOrders } from '@/lib/services/admin/icu/default-orders'

export default async function DefaultOrdersTab({ hosId }: { hosId: string }) {
  const defaultChartOrders = await getDefaultChartOrders(hosId)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>기본 차트</CardTitle>
        <CardDescription>기본형식의 차트를 설정해주세요</CardDescription>
      </CardHeader>

      <CardContent>
        <DefaultOrderTable defaultChartOrders={defaultChartOrders} />
      </CardContent>
    </Card>
  )
}
