'use client'

import MaintenanceRateSettings from '@/components/hospital/admin/icu-settings/maintenance-rate/maintenance-rate-settings'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'

export default function MaintenanceRateTab({ hosId }: { hosId: string }) {
  const {
    basicHosData: { maintenanceRateCalcMethod },
  } = useBasicHosDataContext()

  return (
    <MaintenanceRateSettings
      hosId={hosId}
      maintenaceRateCalcMethodData={maintenanceRateCalcMethod}
    />
  )
}
