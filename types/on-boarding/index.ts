import { Hospital, UserApproval } from '..'

export type SelectHosptialDataTable = Pick<
  Hospital,
  'hos_id' | 'name' | 'city' | 'district'
>

export type UserApprovalHosJoined = Pick<UserApproval, 'user_approval_id'> & {
  hos_id: Pick<Hospital, 'name'>
}
