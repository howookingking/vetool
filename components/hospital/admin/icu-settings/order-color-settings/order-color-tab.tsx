'use client'

import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import OrderColorSettings from './order-color-settings'

export default function OrderColorTab() {
  const {
    basicHosData: { orderColorsData },
  } = useBasicHosDataContext()

  return <OrderColorSettings order_color={orderColorsData} />
}
