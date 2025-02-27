// import PlanIndicator from '@/components/hospital/admin/staff/plan-indicator'
import { staffColumns } from '@/components/hospital/admin/staff/staff-columns'
import DataTable from '@/components/ui/data-table'
import { getStaffs } from '@/lib/services/admin/staff/staff'
import { getVetoolUserData } from '@/lib/services/auth/authorization'
import type { HospitalUserDataTable } from '@/types/adimin'

export default async function AdminStaffPage(props: {
  params: Promise<{ hos_id: string }>
}) {
  const params = await props.params
  const vetoolUser = await getVetoolUserData()
  const staffs = await getStaffs(params.hos_id)
  const isMaster = staffs[0].hos_id.master_user_id === vetoolUser.user_id

  // const plan = await getPlan(params.hos_id)
  // const maxVets = checkMaxVets(plan)
  // const invitableVetCount = getInvitableVetCount(plan, staffs.length)

  const staffsTableData: HospitalUserDataTable[] = staffs.map((user) => ({
    group: user.group,
    name: user.name,
    position: user.position,
    rank: user.rank,
    is_admin: user.is_admin,
    is_vet: user.is_vet,
    user_id: user.user_id,
    avatar_url: user.avatar_url,
    master_user_id: user.hos_id.master_user_id,
    group_list: user.hos_id.group_list,
    isMaster,
  }))

  return (
    <div className="space-y-4">
      {/* <PlanIndicator
        plan={plan}
        invitableVetCount={invitableVetCount}
        maxVets={maxVets}
      /> */}
      <DataTable columns={staffColumns} data={staffsTableData} rowLength={15} />
    </div>
  )
}
