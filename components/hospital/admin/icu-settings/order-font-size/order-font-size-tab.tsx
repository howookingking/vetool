import OrderFontSizeSetting from '@/components/hospital/admin/icu-settings/order-font-size/order-font-size-setting'
import { getHosOrderFontSize } from '@/lib/services/admin/icu/order-font-size'

export default async function OrderFontTab({ hosId }: { hosId: string }) {
  const orderFontSize = await getHosOrderFontSize(hosId)

  return <OrderFontSizeSetting hosId={hosId} orderFontSize={orderFontSize} />
}
