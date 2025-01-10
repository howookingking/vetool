'use client'

import OrdererSetting from '@/components/hospital/admin/icu-settings/orderer/orderer-setting'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'

export default function OrdererTab({ hosId }: { hosId: string }) {
  const {
    basicHosData: { showOrderer, showTxUser },
  } = useBasicHosDataContext()

  return (
    <OrdererSetting
      hosId={hosId}
      showOrderer={showOrderer}
      showTxUser={showTxUser}
    />
  )
}
