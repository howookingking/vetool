'use server'

import { createClient } from '@/lib/supabase/server'
import type { User, UserApproval } from '@/types'
import { redirect } from 'next/navigation'

export type StaffApproval = Pick<
  UserApproval,
  'is_approved' | 'created_at' | 'updated_at'
> & {
  user_id: Pick<User, 'user_id' | 'name' | 'avatar_url' | 'is_vet'>
}

export const getStaffApprovals = async (hosId: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('user_approvals')
    .select(
      `
        is_approved,
        created_at, 
        updated_at,
        user_id(
          user_id, 
          name, 
          avatar_url,
          is_vet
        )
      `,
    )
    .match({ hos_id: hosId })
    .order('is_approved')
    .order('created_at', { ascending: false })
    .returns<StaffApproval[]>()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const approveStaff = async (hosId: string, userId: string) => {
  const supabase = await createClient()
  const { error } = await supabase.rpc(
    'update_user_approval_and_user_hos_id_when_approved',
    {
      hos_id_input: hosId,
      user_id_input: userId,
    },
  )

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }
}
