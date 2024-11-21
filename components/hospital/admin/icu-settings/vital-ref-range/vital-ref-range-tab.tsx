import { getVitalRefRange } from '@/lib/services/admin/icu/vital-ref-range'
import type { VitalRefRange } from '@/types/adimin'
import VitalRefRangeSettings from './vital-ref-range-settings'

export default async function VitalRefRangeTab({ hosId }: { hosId: string }) {
  const vitalRefRangeData = await getVitalRefRange(hosId)

  return (
    <VitalRefRangeSettings
      hosId={hosId}
      vitalRefRangeData={vitalRefRangeData as VitalRefRange[]}
    />
  )
}
