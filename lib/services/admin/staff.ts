'use server'

import { createClient } from '@/lib/supabase/server'
import type { Hospital, User } from '@/types'
import { redirect } from 'next/navigation'

type StaffsData = Pick<
  User,
  | 'name'
  | 'position'
  | 'rank'
  | 'group'
  | 'is_admin'
  | 'user_id'
  | 'is_vet'
  | 'avatar_url'
> & {
  hos_id: Pick<Hospital, 'master_user_id' | 'group_list'>
}

export const getStaffs = async (hosId: string) => {
  const supabase = await createClient()

  const { data: staffs, error } = await supabase
    .from('users')
    .select(
      `
        name,
        position,
        rank,
        group,
        is_admin,
        user_id,
        is_vet,
        avatar_url,
        hos_id(
          master_user_id, 
          group_list
        )
      `,
    )
    .match({ hos_id: hosId })
    .order('rank', { ascending: true })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}` as any)
  }

  return staffs as StaffsData[]
}

export const updateStaffRank = async (userId: string, rankInput: string) => {
  const supabase = await createClient()

  const { error: rankUpdateError } = await supabase
    .from('users')
    .update({ rank: Number(rankInput) })
    .match({ user_id: userId })

  if (rankUpdateError) {
    console.error(rankUpdateError)
    redirect(`/error/?message=${rankUpdateError.message}` as any)
  }
}

export const updateStaffName = async (userId: string, nameInput: string) => {
  const supabase = await createClient()

  const { error } = await supabase
    .from('users')
    .update({ name: nameInput })
    .match({ user_id: userId })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}` as any)
  }
}

export const updateStaffPosition = async (
  userId: string,
  positionInput: string,
) => {
  const supabase = await createClient()

  const { error } = await supabase
    .from('users')
    .update({ position: positionInput })
    .match({ user_id: userId })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}` as any)
  }
}

export const updateHosGroupList = async (
  hosId: string,
  groupList: string[],
) => {
  const supabase = await createClient()
  const { error } = await supabase
    .from('hospitals')
    .update({ group_list: groupList })
    .match({ hos_id: hosId })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}` as any)
  }
}

export type Staff = Pick<
  User,
  | 'name'
  | 'position'
  | 'rank'
  | 'group'
  | 'is_admin'
  | 'user_id'
  | 'is_vet'
  | 'avatar_url'
> & {
  hos_id: Pick<Hospital, 'master_user_id' | 'group_list'>
}

export const updateStaffGroup = async (
  userId: string,
  groupInput: string[],
) => {
  const supabase = await createClient()

  const { error } = await supabase
    .from('users')
    .update({ group: groupInput })
    .match({ user_id: userId })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}` as any)
  }
}

export const updateStaffIsVet = async (userId: string, isVetInput: boolean) => {
  const supabase = await createClient()

  const { error } = await supabase
    .from('users')
    .update({ is_vet: isVetInput })
    .match({ user_id: userId })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}` as any)
  }
}

export const updateStaffIsAdmin = async (
  userId: string,
  isAdminInput: boolean,
) => {
  const supabase = await createClient()

  const { error } = await supabase
    .from('users')
    .update({ is_admin: isAdminInput })
    .match({ user_id: userId })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}` as any)
  }
}

export const deleteStaff = async (userId: string) => {
  const supabase = await createClient()
  const { error: deleteStaffError } = await supabase
    .from('users')
    .update({
      hos_id: null,
      position: '미분류',
      rank: 99,
      group: null,
      is_admin: false,
    })
    .match({ user_id: userId })

  if (deleteStaffError) {
    console.error(deleteStaffError)
    redirect(`/error/?message=${deleteStaffError.message}` as any)
  }

  const { error: deleteUserInApproval } = await supabase
    .from('user_approvals')
    .delete()
    .match({ user_id: userId })

  if (deleteUserInApproval) {
    console.error(deleteUserInApproval)
    redirect(`/error/?message=${deleteUserInApproval.message}` as any)
  }
}
