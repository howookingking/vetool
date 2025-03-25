import {
  type ApprovalDataTable,
  approvlaColumns,
} from '@/components/hospital/admin/approval/approval-columns'
import DataTable from '@/components/ui/data-table'
import { getStaffApprovals } from '@/lib/services/admin/approval'

export default async function AdminApprovalPage(props: {
  params: Promise<{ hos_id: string }>
}) {
  const params = await props.params
  const approvalData = await getStaffApprovals(params.hos_id)

  const approvalDataTableData: ApprovalDataTable[] = approvalData.map(
    (approval) => ({
      is_approved: approval.is_approved,
      created_at: approval.created_at,
      updated_at: approval.updated_at,
      name: approval.user_id.name,
      user_id: approval.user_id.user_id,
      avatar_url: approval.user_id.avatar_url,
      is_vet: approval.user_id.is_vet,
    }),
  )

  return (
    <DataTable
      columns={approvlaColumns}
      data={approvalDataTableData}
      rowLength={15}
    />
  )
}
