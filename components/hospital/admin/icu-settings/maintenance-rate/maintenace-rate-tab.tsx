import { getMaintenaceRateCalcMethod } from '@/lib/services/admin/icu/maintenance-rate'
import MaintenanceRateSettings from './maintenance-rate-settings'

export default async function MaintenanceRateTab({ hosId }: { hosId: string }) {
  const maintenaceRateCalcMethodData = await getMaintenaceRateCalcMethod(hosId)

  return (
    <MaintenanceRateSettings
      hosId={hosId}
      maintenaceRateCalcMethodData={maintenaceRateCalcMethodData}
    />
  )
}
