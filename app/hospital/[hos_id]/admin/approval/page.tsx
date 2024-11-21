import { columns } from '@/components/hospital/admin/approval/column'
import DataTable from '@/components/ui/data-table'
import { getStaffApprovals } from '@/lib/services/admin/approval/approval'
import type { ApprovalDataTable } from '@/types/adimin'

export default async function AdminApprovalPage(props: {
  params: Promise<{ hos_id: string }>
}) {
  const params = await props.params
  const approvalData = await getStaffApprovals(params.hos_id)

  const data: ApprovalDataTable[] = approvalData.map((approval) => ({
    is_approved: approval.is_approved,
    created_at: approval.created_at,
    updated_at: approval.updated_at,
    name: approval.user_id.name,
    user_id: approval.user_id.user_id,
    avatar_url: approval.user_id.avatar_url,
    is_vet: approval.user_id.is_vet,
  }))

  return <DataTable columns={columns} data={data} rowLength={15} />
}
