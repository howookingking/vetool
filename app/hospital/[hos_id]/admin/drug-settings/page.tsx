import { drugColumns } from '@/components/hospital/admin/drug/drug-columns'
import DataTable from '@/components/ui/data-table'
import { getDrugProductDetails } from '@/lib/services/settings/drug-settings'

export default async function AdminDrugSettingsPage({
  params,
}: {
  params: { hos_id: string }
}) {
  const data = await getDrugProductDetails(params.hos_id)

  console.log(data)

  return (
    <DataTable
      columns={drugColumns}
      data={data}
      searchPlaceHolder="약물을 검색해보세요"
    />
  )
}
