import { getRerCalcMethod } from '@/lib/services/admin/icu/rer-calc'
import RerCalcSettings from './rer-calc-settings'

export default async function RerCalcTab({ hosId }: { hosId: string }) {
  const rerCalcMethodData = await getRerCalcMethod(hosId)

  return <RerCalcSettings hosId={hosId} rerCalcMethodData={rerCalcMethodData} />
}
