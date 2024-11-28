import DietDataTable from '@/components/hospital/admin/diet/diet-data-table'
import { getDiets, getPinnedDiets } from '@/lib/services/admin/diet/diet'

export default async function AdminFoodSettingsPage(props: {
  params: Promise<{ hos_id: string }>
}) {
  const params = await props.params
  const dietsData = await getDiets(params.hos_id)
  const pinnedDiets = await getPinnedDiets(params.hos_id)
  const pinnedDietsIds = pinnedDiets.map((diet) => diet.diet_id)

  const sortedDietData = [...dietsData].sort((a, b) => {
    const aIsPinned = pinnedDietsIds.includes(a.diet_id)
    const bIsPinned = pinnedDietsIds.includes(b.diet_id)

    if (aIsPinned && !bIsPinned) return -1
    if (!aIsPinned && bIsPinned) return 1
    return 0
  })

  return (
    <div className="relative">
      <DietDataTable
        dietData={sortedDietData}
        hosId={params.hos_id}
        pinnedDietsIds={pinnedDietsIds}
      />
    </div>
  )
}
