'use client'

import VitalRefRangeSettings from '@/components/hospital/admin/icu-settings/vital-ref-range/vital-ref-range-settings'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'

export default function VitalRefRangeTab({ hosId }: { hosId: string }) {
  const {
    basicHosData: { vitalRefRange },
  } = useBasicHosDataContext()

  return (
    <VitalRefRangeSettings hosId={hosId} vitalRefRangeData={vitalRefRange} />
  )
}
