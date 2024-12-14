import DrugsDataTable from '@/components/hospital/admin/drug/drugs-data-table/drugs-data-table'
import { getDiets, getPinnedDiets } from '@/lib/services/admin/diet/diet'
import { getHosName } from '@/lib/services/hospital-home/get-hos-name'
import { getDrugs, getHosDrugs } from '@/lib/services/icu/chart/get-drugs'

export default async function AdminDrugSettingsPage(props: {
  params: Promise<{ hos_id: string }>
}) {
  const params = await props.params
  const hosName = await getHosName(params.hos_id)
  const hosDrugs = await getHosDrugs(params.hos_id)

  return <DrugsDataTable hosName={hosName} hosDrugs={hosDrugs} />
}
