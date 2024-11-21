import { drugColumns } from '@/components/hospital/admin/drug/drug-columns'
import DataTable from '@/components/ui/data-table'
// import { getDrugProductDetails } from '@/lib/services/settings/drug-settings'

export default async function AdminDrugSettingsPage(props: {
  params: Promise<{ hos_id: string }>
}) {
  const params = await props.params
  // const data = await getDrugProductDetails(params.hos_id)

  return (
    <DataTable
      columns={drugColumns}
      data={[]}
      searchPlaceHolder="약물을 검색해보세요"
    />
  )
}
