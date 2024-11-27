import AddDietDialog from '@/components/hospital/admin/diet/add-diet-dialog'
import DietDataTable from '@/components/hospital/admin/diet/diet-data-table'
import { getDiet } from '@/lib/services/admin/diet/diet'

export default async function AdminFoodSettingsPage(props: {
  params: Promise<{ hos_id: string }>
}) {
  const params = await props.params
  const dietData = await getDiet(params.hos_id)

  return (
    <div className="relative p-2">
      <AddDietDialog />

      <DietDataTable dietData={dietData} hosId={params.hos_id} />
    </div>
  )
}
