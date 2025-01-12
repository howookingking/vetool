'use client'

import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import OrderColorSettings from './order-color-settings'

export default function OrderColorTab() {
  const {
    basicHosData: { orderColorsData, orderColorDisplay },
  } = useBasicHosDataContext()

  return (
    <OrderColorSettings
      orderColorSettings={{
        order_color: orderColorsData,
        order_color_display: orderColorDisplay,
      }}
    />
  )
}
