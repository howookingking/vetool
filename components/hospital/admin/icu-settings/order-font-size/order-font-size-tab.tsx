'use client'

import OrderFontSizeSetting from '@/components/hospital/admin/icu-settings/order-font-size/order-font-size-setting'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'

export default function OrderFontSizeTab({ hosId }: { hosId: string }) {
  const {
    basicHosData: { orderFontSizeData },
  } = useBasicHosDataContext()

  return (
    <OrderFontSizeSetting hosId={hosId} orderFontSize={orderFontSizeData} />
  )
}
