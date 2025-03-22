import HosDrugSetting from '@/components/hospital/admin/icu-settings/hos-drug/hos-drug-setting'
import { getHosDrugs } from '@/lib/services/admin/icu/hos-drugs'

export default async function HosDrugTab({ hosId }: { hosId: string }) {
  const hosDrugs = await getHosDrugs(hosId)

  return <HosDrugSetting hosId={hosId} hosDrugs={hosDrugs} />
}
