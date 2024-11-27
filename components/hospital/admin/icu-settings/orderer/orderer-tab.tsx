import { getShowOrderer } from '@/lib/services/admin/icu/orderer'
import OrdererSetting from './orderer-setting'

export default async function OrdererTab({ hosId }: { hosId: string }) {
  const showOrderer = await getShowOrderer(hosId)

  return <OrdererSetting hosId={hosId} showOrderer={showOrderer} />
}
