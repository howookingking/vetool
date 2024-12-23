import { getOrdererSetting } from '@/lib/services/admin/icu/orderer'
import OrdererSetting from './orderer-setting'

export default async function OrdererTab({ hosId }: { hosId: string }) {
  const { showOrderer, showTxUser } = await getOrdererSetting(hosId)

  return (
    <OrdererSetting
      hosId={hosId}
      showOrderer={showOrderer}
      showTxUser={showTxUser}
    />
  )
}
