import { getShowOrderer } from '@/lib/services/admin/icu/orderer'
import OrdererSwitch from './orderer-switch'

export default async function OrdererTab({ hosId }: { hosId: string }) {
  const showOrderer = await getShowOrderer(hosId)

  return <OrdererSwitch showOrderer={showOrderer} hosId={hosId} />
}
