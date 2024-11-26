import AddDietDialog from '@/components/hospital/admin/diet/add-diet-dialog'
import { dietColumns } from '@/components/hospital/admin/diet/diet-columns'
import DataTable from '@/components/ui/data-table'
import { getDiet } from '@/lib/services/admin/diet/diet'

export default async function AdminFoodSettingsPage(props: {
  params: Promise<{ hos_id: string }>
}) {
  const params = await props.params

  const dietData = await getDiet(params.hos_id)

  return (
    <div className="relative p-2">
      <AddDietDialog />

      <DataTable
        data={dietData}
        columns={dietColumns}
        searchPlaceHolder="사료명, 제조사, 설명으로 검색"
      />
    </div>
  )
}
