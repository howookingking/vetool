import HosDrugSetting from '@/components/hospital/admin/icu-settings/hos-drug/hos-drug-setting'
import { getRawDrugs } from '@/lib/services/icu/chart/get-drugs'

export default async function HosDrugTab({ hosId }: { hosId: string }) {
  const rawDrugs = await getRawDrugs()

  return <HosDrugSetting rawDrugs={rawDrugs} hosId={hosId} />
}
