import { getHosDiets, getPinnedDiets } from '@/lib/services/admin/diet'
import { getHosName } from '@/lib/services/hospital-home/get-hos-name'
import DietDataTables from '@/unused/diet/diet-data-tables'

export default async function AdminFoodSettingsPage(props: {
  params: Promise<{ hos_id: string }>
}) {
  const params = await props.params
  const dietsData = await getHosDiets(params.hos_id)
  const pinnedDiets = await getPinnedDiets(params.hos_id)
  const hosName = await getHosName(params.hos_id)

  return (
    <DietDataTables
      dietsData={dietsData}
      hosId={params.hos_id}
      pinnedDiets={pinnedDiets}
      hosName={hosName}
    />
  )
}
