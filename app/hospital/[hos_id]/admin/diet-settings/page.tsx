import DietDataTables from '@/components/hospital/admin/diet/diet-data-tables'
import { getDiets, getPinnedDiets } from '@/lib/services/admin/diet/diet'
import { getHosName } from '@/lib/services/hospital-home/get-hos-name'

export default async function AdminFoodSettingsPage(props: {
  params: Promise<{ hos_id: string }>
}) {
  const params = await props.params
  const dietsData = await getDiets(params.hos_id)
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
